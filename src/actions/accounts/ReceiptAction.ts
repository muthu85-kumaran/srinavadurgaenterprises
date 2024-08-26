"use server";
import db from "@/db/database";
import { getErrorMessage } from "@/lib/utils";
import { Receipt, ReceiptSchema } from "@/types/receipt";
import { OrderStatusCode, PaymentStatusEnum, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const saveReceipt = async (receipt: Receipt) => {
  const validation = ReceiptSchema.safeParse(receipt);
  if (!validation.success) {
    return { data: null, error: validation.error.issues, success: false };
  }

  try {
    if (receipt.invoiceId) {
      const invoiceexist = await db.salesInvoice.findUnique({
        where: {
          id: receipt.invoiceId,
        },
      });

      if (!invoiceexist) {
        return {
          data: null,
          error: "Invoice not found",
          success: false,
        };
      }
      // check if receipt amount is greater than invoice amount
      const receiptexist = await db.receipt.findMany({
        where: {
          invoiceId: receipt.invoiceId,
        },
      });
      //  sum of all receipts for this invoice and check if it is greater than invoice amount
      const totalreceipt = receiptexist.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);

      if (totalreceipt + receipt.amount > invoiceexist?.invoiceTotalAmount) {
        return {
          data: null,
          error: "Receipt amount is greater than invoice amount",
          success: false,
        };
      }

      const result = await db.receipt.create({
        data: {
          customerId: receipt.customerId,
          invoiceId: receipt.invoiceId || "",
          salesOrderId: receipt.salesOrderId || "",
          amount: receipt.amount,
          paymentModeId: receipt.paymentModeId,
          receiptDate: receipt.receiptDate,
          referenceNo: receipt.referenceNo || "",
        },
      } satisfies Prisma.ReceiptCreateArgs);

      if (invoiceexist?.invoiceTotalAmount === totalreceipt + receipt.amount) {
        await db.salesInvoice.update({
          where: {
            id: receipt.invoiceId,
          },
          data: {
            paymentStatus: PaymentStatusEnum.PAID,
          },
        });
        if (invoiceexist.salesOrderId) {
          await db.salesOrder.update({
            where: {
              id: invoiceexist.salesOrderId,
            },
            data: {
              paymentStatus: PaymentStatusEnum.PAID,
            },
          });
        }
      } else {
        await db.salesInvoice.update({
          where: {
            id: receipt.invoiceId,
          },
          data: {
            paymentStatus: PaymentStatusEnum.PARTIALLY_PAID,
          },
        });
        if (invoiceexist.salesOrderId) {
          await db.salesOrder.update({
            where: {
              id: invoiceexist.salesOrderId,
            },
            data: {
              paymentStatus: PaymentStatusEnum.PARTIALLY_PAID,
            },
          });
        }
      }
      revalidatePath("/admin/receipt/add");
      const newdata = await getReceipt(result.id);
      return { data: newdata, error: null, success: true };
    }

    if (receipt.salesOrderId && !receipt.invoiceId) {
      const salesorderexist = await db.salesOrder.findUnique({
        where: {
          id: receipt.salesOrderId,
        },
      });

      if (!salesorderexist) {
        return {
          data: null,
          error: "Sales Order not found",
          success: false,
        };
      }
      const receiptexist = await db.receipt.findMany({
        where: {
          salesOrderId: receipt.salesOrderId,
        },
      });
      //  sum of all receipts for this sales order and check if it is greater than sales order amount
      const totalreceipt = receiptexist.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);
      if (totalreceipt + receipt.amount > salesorderexist?.orderTotalAmount) {
        return {
          data: null,
          error: "Receipt amount is greater than sales order amount",
          success: false,
        };
      }
      const result = await db.receipt.create({
        data: {
          customerId: receipt.customerId,
          invoiceId: receipt.invoiceId || "",
          salesOrderId: receipt.salesOrderId || "",
          amount: receipt.amount,
          paymentModeId: receipt.paymentModeId,
          receiptDate: receipt.receiptDate,
          referenceNo: await receiptrefno(),
        },
      } satisfies Prisma.ReceiptCreateArgs);

      if (salesorderexist?.orderTotalAmount === totalreceipt + receipt.amount) {
        await db.salesOrder.update({
          where: {
            id: receipt.salesOrderId,
          },
          data: {
            paymentStatus: PaymentStatusEnum.PAID,
          },
        });
        const status = await db.salesOrderStatus.findFirst({
          where: {
            orderId: receipt.salesOrderId,
            statusCode: OrderStatusCode.CONFIRMED,
          },
        });
        if (!status) {
          await db.salesOrderStatus.create({
            data: {
              orderId: receipt.salesOrderId,
              statusCode: OrderStatusCode.CONFIRMED,
              statusDate: new Date(),
            },
          });
        }
      } else {
        await db.salesOrder.update({
          where: {
            id: receipt.salesOrderId,
          },
          data: {
            paymentStatus: PaymentStatusEnum.PARTIALLY_PAID,
          },
        });
      }
      revalidatePath("/admin/receipt/add");
      const newdata = await getReceipt(result.id);
      return { data: newdata, error: null, success: true };
    }
  } catch (error) {
    const message = getErrorMessage(error);
    return { data: null, error: message, success: false };
  }
};

export const getReceipt = async (id: string) => {
  try {
    const data = await db.receipt.findUnique({
      where: {
        id,
      },
      relationLoadStrategy: "join",
      include: {
        customer: true,
        invoice: true,
        salesorder: true,
        paymentMode: true,
      },
    } satisfies Prisma.ReceiptFindUniqueArgs);
    return { data, error: null, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { data: null, error: message, success: false };
  }
};

export const getReceiptsByInvoiceId = async (
  invoiceId: string,
  salesOrderId?: string
) => {
  try {
    if (salesOrderId) {
      const data = await db.receipt.findMany({
        where: {
          OR: [
            {
              invoiceId: invoiceId,
            },
            {
              salesOrderId: salesOrderId,
            },
          ],
        },
      } satisfies Prisma.ReceiptFindManyArgs);
      return { data, error: null, success: true };
    } else {
      const data = await db.receipt.findMany({
        where: {
          invoiceId: invoiceId,
        },
      } satisfies Prisma.ReceiptFindManyArgs);
      return { data, error: null, success: true };
    }
  } catch (error) {
    const message = getErrorMessage(error);
    return { data: null, error: message, success: false };
  }
};

export const getReceiptsBySalesOrderId = async (salesOrderId: string) => {
  try {
    const data = await db.receipt.findMany({
      where: {
        salesOrderId,
      },
    } satisfies Prisma.ReceiptFindManyArgs);
    return { data, error: null, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { data: null, error: message, success: false };
  }
};

export const listReceipt = async () => {
  try {
    const data = await db.receipt.findMany({
      include: {
        customer: true,
        paymentMode: true,
      },
    } satisfies Prisma.ReceiptFindManyArgs);
    return { data, error: null, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { data: null, error: message, success: false };
  }
};

export type ListReceiptType = Prisma.ReceiptGetPayload<{
  include: {
    customer: true;
    // invoice: true;
    // salesorder: true;
    paymentMode: true;
  };
}>;

const receiptrefno = async () => {
  const receipt = await db.receipt.findFirst({
    orderBy: {
      referenceNo: "desc",
    },
  } satisfies Prisma.ReceiptFindFirstArgs);

  if (receipt) {
    const refno = receipt.referenceNo ?? "RC-1";
    const ref = parseInt(refno.split("-")[1]) + 1;
    return "RC-" + ref;
  } else {
    return "RC-1";
  }
};
