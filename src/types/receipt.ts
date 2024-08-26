import z from "zod";

export const ReceiptSchema = z.object({
  customerId: z.string().min(1, { message: "Customer is required" }),
  invoiceId: z.string().optional(),
  salesOrderId: z.string().optional(),
  amount: z.preprocess((val) => {
    return Number(val);
  }, z.number().min(1, { message: "Amount is required" })),
  paymentModeId: z.string().min(1, { message: "Payment Mode is required" }),
  receiptDate: z.coerce.date(),
  referenceNo: z.string().optional(),
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type Receipt = z.infer<typeof ReceiptSchema>;
