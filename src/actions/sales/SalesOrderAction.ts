"use server";
import { SalesOrderSchema } from "@/types/SalesOrder";
import { getErrorMessage } from "@/lib/utils";
import { ZodIssue } from "zod";
import db from "@/db/database";
import { OrderStatusCode, PaymentStatusEnum } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { SalesOrder as SO } from "@/types/SalesOrder";

export const SaveSalesOrderAction = async (newSalesOrder: SO) => {
  var responseData: unknown | SalesOrder;
  var error: unknown | string | ZodIssue[];

  const validation = SalesOrderSchema.safeParse(newSalesOrder);

  if (validation.error) {
    error = validation.error.format();
    return { data: null, error, success: false };
  }

  const data = validation.data!!; // Ensure data is not undefined

  try {
    if (validation.success && validation.data) {
      data.id = undefined;

      const lastrecord = await db.salesOrder.findMany({
        orderBy: {
          orderNo: "desc",
        },
        take: 1,
      });
      if (lastrecord.length > 0) {
        data.orderNo =
          "SO-" + (parseInt(lastrecord[0].orderNo.split("-")[1]) + 1);
      } else {
        data.orderNo = "SO-1";
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

      const newsales = await db.salesOrder.create({
        data: {
          orderNo: data.orderNo,
          orderDate: data.orderDate,
          customerId: data.customerId || "",
          orderGrossAmount: data.orderGrossAmount,
          orderTotalAmount: data.orderTotalAmount,
          billingAddressId: newbillingaddress.id,
          shippingAddressId: newshippingaddress.id,
          paymentModeId: data.paymentModeId || "",
        },
      });
      const orderItems = data.orderItems.map((item) => {
        return {
          orderId: newsales.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          discountAmount: item.discountAmount,
          taxAmount: item.taxAmount,
          totalAmount: item.totalAmount,
          subTotalAmount: item.subTotalAmount,
        };
      });
      const neworderItems = await db.salesOrderItem.createMany({
        data: orderItems,
      });
      const neworderstatus = await db.salesOrderStatus.create({
        data: {
          orderId: newsales.id,
          statusCode: OrderStatusCode.PENDING,
          statusDate: new Date(),
        },
      });

      if (data.paymentModeId) {
        const paymentMode = await db.paymentMode.findUnique({
          where: {
            id: data.paymentModeId,
          },
        });
        if (paymentMode?.name !== "CREDIT") {
          await db.receipt.create({
            data: {
              customerId: data.customerId,
              salesOrderId: newsales.id,
              invoiceId: "",
              amount: data.orderTotalAmount,
              paymentModeId: data.paymentModeId,
              receiptDate: new Date(),
            },
          });

          await db.salesOrder.update({
            where: {
              id: newsales.id,
            },
            data: {
              paymentStatus: PaymentStatusEnum.PAID,
            },
          });
          await db.salesOrderStatus.create({
            data: {
              orderId: newsales.id,
              statusCode: OrderStatusCode.CONFIRMED,
              statusDate: new Date(),
            },
          });
        }
      }

      return { data: newsales, error, success: true };
    } else {
      error = "Please Enter a valid Data.";
      return { data: null, error, success: false };
    }
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const listSalesOrderAction = async () => {
  var error: unknown | string | ZodIssue[];
  try {
    const data = await db.salesOrder.findMany({
      relationLoadStrategy: "join",
      include: SalesOrderInclude,
      orderBy: {
        orderDate: "desc",
      },
    });

    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

const SalesOrderInclude = Prisma.validator<Prisma.SalesOrderInclude>()({
  orderItems: {
    include: {
      product: {
        include: {
          productTax: true,
        },
      },
    },
  },
  orderStatus: true,
  customer: true,
  billingAddress: true,
  shippingAddress: true,
  paymentMode: true,
});

export type SalesOrder = Prisma.SalesOrderGetPayload<{
  include: typeof SalesOrderInclude;
}>;

export const listSalesOrderPendingAction = async () => {
  var error: unknown | string | ZodIssue[];
  try {
    const data = await db.salesOrder.findMany({
      where: {
        salesInvoice: {
          is: null,
        },
      },
      relationLoadStrategy: "join",
      include: SalesOrderInclude,
    });

    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const listSalesOrderPaymentPendingAction = async () => {
  var error: unknown | string | ZodIssue[];
  try {
    // where paymentStatus is PENDING or PARTIALLY_PAID

    const data = await db.salesOrder.findMany({
      where: {
        paymentStatus: {
          in: [PaymentStatusEnum.PENDING, PaymentStatusEnum.PARTIALLY_PAID],
        },
        orderStatus: {
          some: {
            statusCode: OrderStatusCode.PENDING,
          },
        },
      },
      relationLoadStrategy: "join",
      include: SalesOrderInclude,
    });

    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const getSalesOrderAction = async (id: string) => {
  var error: unknown | string | ZodIssue[];
  try {
    const data = await db.salesOrder.findUnique({
      where: { id },
      include: SalesOrderInclude,
    });

    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};
