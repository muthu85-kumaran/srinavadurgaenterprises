"use server";
import { SalesInvoiceSchema } from "@/types/SalesInvoice";
import { getErrorMessage } from "@/lib/utils";
import { ZodIssue } from "zod";
import db from "@/db/database";
import { OrderStatusCode, PaymentStatusEnum } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { SalesInvoice as SI } from "@/types/SalesInvoice";

export const SaveSalesInvoiceAction = async (newSalesInvoice: SI) => {
  var responseData: unknown | SalesInvoice;
  var error: unknown | string | ZodIssue[];

  const validation = SalesInvoiceSchema.safeParse(newSalesInvoice);

  if (validation.error) {
    error = validation.error.format();
    return { data: null, error, success: false };
  }

  const data = validation.data!!; // Ensure data is not undefined

  try {
    if (validation.success && validation.data) {
      data.id = undefined;
      const lastrecord = await db.salesInvoice.findMany({
        orderBy: {
          invoiceNo: "desc",
        },
        take: 1,
      });
      if (lastrecord.length > 0) {
        data.invoiceNo =
          "INV-" + (parseInt(lastrecord[0].invoiceNo.split("-")[1]) + 1);
      } else {
        data.invoiceNo = "INV-1";
      }

      if (data.salesOrderId) {
        const order = await db.salesOrderStatus.findFirst({
          where: {
            orderId: data.salesOrderId,
            statusCode: OrderStatusCode.CONFIRMED,
          },
        });
        if (!order) {
          return {
            data: null,
            error: "Sales Order not confirmed",
            success: false,
          };
        }
      }

      if (
        data.customerId === undefined ||
        data.customerId === null ||
        data.customerId === ""
      ) {
        const newcustomer = await db.customer.create({
          data: {
            name: data.customer?.name || "",
            contactNo: data.customer?.contactNo || "",
            email: data.customer?.email,
            gstin: data.customer?.gstin,
            pan: data.customer?.pan,
            address: data.customer?.address || "",
            city: data.customer?.city || "",
            state: data.customer?.state || "",
            pincode: data.customer?.pincode || "",
            country: data.customer?.country || "IN",
          },
        });
        data.customerId = newcustomer.id;
      }
      const cus = await db.customer.findUnique({
        where: {
          id: data.customerId,
        },
      });

      const newbillingaddress = await db.billingAddress.create({
        data: {
          name: data.customer?.name || "",
          contactNo: data.customer?.contactNo || "",
          address: cus?.address || "",
          city: cus?.city || "",
          state: cus?.state || "",
          pincode: cus?.pincode || "",
          country: cus?.country || "",
        },
      });
      const newshippingaddress = await db.shippingAddress.create({
        data: {
          name: cus?.name || "",
          contactNo: cus?.contactNo || "",
          address: cus?.address || "",
          state: cus?.state || "",
          city: cus?.city || "",
          pincode: cus?.pincode || "",
          country: cus?.country || "",
        },
      });

      const newsales = await db.salesInvoice.create({
        data: {
          salesOrderId: data.salesOrderId || "",
          invoiceNo: data.invoiceNo,
          invoiceDate: data.invoiceDate,
          customerId: data.customerId || "",
          invoiceGrossAmount: data.invoiceGrossAmount,
          invoiceTotalAmount: data.invoiceTotalAmount,
          billingAddressId: newbillingaddress.id,
          shippingAddressId: newshippingaddress.id,
          paymentModeId: data.paymentModeId || "",
        },
      });
      const InvoiceItems = data.invoiceItems.map((item) => {
        return {
          invoiceId: newsales.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          discountAmount: item.discountAmount,
          taxAmount: item.taxAmount,
          totalAmount: item.totalAmount,
          subTotalAmount: item.subTotalAmount,
        };
      });
      const newInvoiceItems = await db.salesInvoiceItem.createMany({
        data: InvoiceItems,
      });

      if (data.salesOrderId) {
        const order = await db.salesOrderStatus.create({
          data: {
            orderId: data.salesOrderId,
            statusCode: OrderStatusCode.INVOICED,
            statusDate: new Date(),
          },
        });

        const receipts = await db.receipt.findMany({
          where: {
            salesOrderId: data.salesOrderId,
          },
        });
        const totalreceipt = receipts.reduce((acc, item) => {
          return acc + item.amount;
        }, 0);
        if (totalreceipt === data.invoiceTotalAmount) {
          await db.salesInvoice.update({
            where: {
              salesOrderId: data.salesOrderId,
            },
            data: {
              paymentStatus: PaymentStatusEnum.PAID,
            },
          });
          const status = await db.salesOrderStatus.findFirst({
            where: {
              orderId: data.salesOrderId,
              statusCode: OrderStatusCode.CONFIRMED,
            },
          });
          if (!status) {
            await db.salesOrderStatus.create({
              data: {
                orderId: data.salesOrderId,
                statusCode: OrderStatusCode.CONFIRMED,
                statusDate: new Date(),
              },
            });
          }
        } else {
          await db.salesInvoice.update({
            where: {
              salesOrderId: data.salesOrderId,
            },
            data: {
              paymentStatus: PaymentStatusEnum.PARTIALLY_PAID,
            },
          });
        }
      }
      const newSalesInvoice = await db.salesInvoice.findUnique({
        where: { id: newsales.id },
      });

      if (data.paymentModeId) {
        const paymentMode = await db.paymentMode.findUnique({
          where: {
            id: data.paymentModeId,
          },
        });
        if (
          paymentMode?.name !== "CREDIT" &&
          !(newSalesInvoice?.paymentStatus === "PAID")
        ) {
          await db.receipt.create({
            data: {
              invoiceId: newsales.id,
              customerId: data.customerId || "",
              amount: data.invoiceTotalAmount,
              paymentModeId: data.paymentModeId,
              receiptDate: new Date(),
              salesOrderId: data.salesOrderId || "",
            },
          });
          await db.salesInvoice.update({
            where: {
              id: newsales.id,
            },
            data: {
              paymentStatus: PaymentStatusEnum.PAID,
            },
          });

          if (data.salesOrderId) {
            await db.salesOrder.update({
              where: {
                id: data.salesOrderId,
              },
              data: {
                paymentStatus: PaymentStatusEnum.PAID,
              },
            });
          }
        }
      }
      revalidatePath("/admin/sales/add");
      return { data: newSalesInvoice, error: null, success: true };
    } else {
      const message = "Please Enter a valid Data.";
      return { data: null, error: message, success: false };
    }
  } catch (error) {
    const message = getErrorMessage(error);
    return { data: null, error: message, success: false };
  }
};

export const listSalesInvoiceAction = async () => {
  try {
    const data = await db.salesInvoice.findMany({
      relationLoadStrategy: "join",
      include: {
        invoiceItems: {
          include: {
            product: {
              include: {
                productTax: true,
              },
            },
          },
        },
        customer: true,
        billingAddress: true,
        shippingAddress: true,
        paymentMode: true,
        // salesOrder: true,
      },
      orderBy: {
        invoiceDate: "desc",
      },
    });
    return { data, error: null, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { data: null, error: message, success: false };
  }
};

export const listSalesInvoicePaymentPendingAction = async () => {
  try {
    const data = await db.salesInvoice.findMany({
      where: {
        paymentStatus: {
          in: [PaymentStatusEnum.PENDING, PaymentStatusEnum.PARTIALLY_PAID],
        },
      },
      include: SalesInvoiceInclude,
      orderBy: {
        invoiceDate: "desc",
      },
    });
    return { data, error: null, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { data: null, error: message, success: false };
  }
};

const SalesInvoiceInclude = Prisma.validator<Prisma.SalesInvoiceInclude>()({
  invoiceItems: {
    include: {
      product: {
        include: {
          productTax: true,
        },
      },
    },
  },
  customer: true,
  billingAddress: true,
  shippingAddress: true,
  paymentMode: true,
  salesOrder: true,
});

export type SalesInvoice = Prisma.SalesInvoiceGetPayload<{
  include: typeof SalesInvoiceInclude;
}>;

export const getSalesInvoiceByIdAction = async (id: string) => {
  try {
    const data = await db.salesInvoice.findUnique({
      where: { id: id },
      include: SalesInvoiceInclude,
    });
    return { data: data, error: null, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { data: null, error: message, success: false };
  }
};

// export type GetSalesInvoice = Prisma.SalesInvoiceGetPayload<{
//   include: typeof SalesInvoiceInclude;
// }>;
