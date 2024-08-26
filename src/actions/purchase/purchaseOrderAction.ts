"use server";
import { PurchaseOrderSchema } from "@/types/purchaseOrder";
import { getErrorMessage } from "@/lib/utils";
import { ZodIssue } from "zod";
import db from "@/db/database";
import { OrderStatusCode, PaymentStatusEnum } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { PurchaseOrder as PO } from "@/types/purchaseOrder";

export const SavePurchaseOrderAction = async (newPurchaseOrder: PO) => {
  var responseData: unknown | PurchaseOrder;
  var error: unknown | string | ZodIssue[];

  const validation = PurchaseOrderSchema.safeParse(newPurchaseOrder);

  if (validation.error) {
    error = validation.error.format();
    return { data: null, error, success: false };
  }

  const data = validation.data!!; // Ensure data is not undefined

  try {
    if (validation.success && validation.data) {
      data.id = undefined;

      const lastrecord = await db.purchaseOrder.findMany({
        orderBy: {
          orderNo: "desc",
        },
        take: 1,
      });
      if (lastrecord.length > 0) {
        data.orderNo =
          "PO-" + (parseInt(lastrecord[0].orderNo.split("-")[1]) + 1);
      } else {
        data.orderNo = "PO-1";
      }

      if (
        data.vendorId === undefined ||
        data.vendorId === null ||
        data.vendorId === ""
      ) {
        const newvendor = await db.customer.create({
          data: {
            name: data.vendor?.name || "",
            contactNo: data.vendor?.contactNo || "",
            email: data.vendor?.email,
            gstin: data.vendor?.gstin,
            pan: data.vendor?.pan,
            address: data.vendor?.address || "",
            city: data.vendor?.city || "",
            state: data.vendor?.state || "",
            pincode: data.vendor?.pincode || "",
            country: data.vendor?.country || "",
          },
        });
        data.vendorId = newvendor.id;
      }

      const newbillingaddress = await db.billingAddress.create({
        data: {
          name: data.vendor?.name || "",
          contactNo: data.vendor?.contactNo || "",
          address: data.billingAddress.address,
          city: data.billingAddress.city,
          state: data.billingAddress.state,
          pincode: data.billingAddress.pincode,
          country: data.billingAddress.country,
        },
      });
      const newshippingaddress = await db.shippingAddress.create({
        data: {
          name: data.vendor?.name || "",
          contactNo: data.vendor?.contactNo || "",
          address: data.billingAddress.address,
          state: data.billingAddress.state,
          city: data.billingAddress.city,
          pincode: data.billingAddress.pincode,
          country: data.billingAddress.country,
        },
      });

      const newPurchase = await db.purchaseOrder.create({
        data: {
          orderNo: data.orderNo,
          orderDate: data.orderDate,
          vendorId: data.vendorId || "",
          orderGrossAmount: data.orderGrossAmount,
          orderTotalAmount: data.orderTotalAmount,
          billingAddressId: newbillingaddress.id,
          shippingAddressId: newshippingaddress.id,
          paymentModeId: data.paymentModeId || "",
        },
      });
      const orderItems = data.orderItems.map((item) => {
        return {
          orderId: newPurchase.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          discountAmount: item.discountAmount,
          taxAmount: item.taxAmount,
          totalAmount: item.totalAmount,
          subTotalAmount: item.subTotalAmount,
        };
      });
      const neworderItems = await db.purchaseOrderItem.createMany({
        data: orderItems,
      });
      const neworderstatus = await db.purchaseOrderStatus.create({
        data: {
          orderId: newPurchase.id,
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
          await db.payment.create({
            data: {
              vendorId: data.vendorId,
              purchaseOrderId: newPurchase.id,
              invoiceId: "",
              amount: data.orderTotalAmount,
              paymentModeId: data.paymentModeId,
              paymentDate: new Date(),
            },
          });

          await db.purchaseOrder.update({
            where: {
              id: newPurchase.id,
            },
            data: {
              paymentStatus: PaymentStatusEnum.PAID,
            },
          });
          await db.purchaseOrderStatus.create({
            data: {
              orderId: newPurchase.id,
              statusCode: OrderStatusCode.CONFIRMED,
              statusDate: new Date(),
            },
          });
        }
      }

      return { data: newPurchase, error, success: true };
    } else {
      error = "Validation failed";
      return { data: null, error, success: false };
    }
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const listPurchaseOrderAction = async () => {
  var error: unknown | string | ZodIssue[];
  try {
    const data = await db.purchaseOrder.findMany({
      relationLoadStrategy: "join",
      include: PurchaseOrderInclude,
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

const PurchaseOrderInclude = Prisma.validator<Prisma.PurchaseOrderInclude>()({
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
  vendor: true,
  billingAddress: true,
  shippingAddress: true,
  paymentMode: true,
});

export type PurchaseOrder = Prisma.PurchaseOrderGetPayload<{
  include: typeof PurchaseOrderInclude;
}>;

export const listPurchaseOrderPendingAction = async () => {
  var error: unknown | string | ZodIssue[];
  try {
    const data = await db.purchaseOrder.findMany({
      // where: {
      //   purchaseInvoice: {
      //     is: null,
      //   },
      // },
      relationLoadStrategy: "join",
      include: PurchaseOrderInclude,
    });

    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const listPurchaseOrderPaymentPendingAction = async () => {
  var error: unknown | string | ZodIssue[];
  try {
    // where paymentStatus is PENDING or PARTIALLY_PAID

    const data = await db.purchaseOrder.findMany({
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
      include: PurchaseOrderInclude,
    });

    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const getPurchaseOrderAction = async (id: string) => {
  var error: unknown | string | ZodIssue[];
  try {
    const data = await db.purchaseOrder.findUnique({
      where: { id },
      include: PurchaseOrderInclude,
    });

    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};
