import z from "zod";
import { CustomerSchema } from "./Customer";
import { PaymentModeSchema } from "./PaymentMode";

export const SalesInvoiceItemObject = z.object({
  invoiceId: z.string().optional(),
  productId: z.string().min(1, { message: "Product is required" }),
  productName: z.string().min(1, { message: "Product Name is required" }),
  quantity: z.preprocess((val) => {
    return Number(val);
  }, z.number().min(1, { message: "Quantity is required" })),
  price: z.preprocess((val) => {
    return Number(val);
  }, z.number().min(1, { message: "Price is required" })),
  discountAmount: z.preprocess((val) => {
    return Number(val);
  }, z.number()),
  tax: z.coerce.number(),
  taxAmount: z.coerce.number(),
  totalAmount: z.coerce
    .number()
    .min(1, { message: "Total Amount is required" }),
  subTotalAmount: z.coerce
    .number()
    .min(1, { message: "Sub Total Amount is required" }),

  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});
export const BillingAddressObject = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters long"),
  contactNo: z
    .string()
    .min(10, "Contact Number must be atleast 10 characters long"),
  address: z.string().min(10, "Address must be atleast 10 characters long"),
  state: z.string().min(2, "State must be atleast 2 characters long"),
  city: z.string().min(4, "City must be atleast 4 characters long"),
  pincode: z.string().min(6, "Pincode must be atleast 6 characters long"),
  country: z.string().min(2, "Country must be atleast 2 characters long"),
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});
export const ShippingAddressObject = z.object({
  name: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  country: z.string().optional(),
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const SalesInvoiceSchema = z.object({
  invoiceNo: z.string().optional(),
  salesOrderId: z.string().optional(),
  customerId: z.string().optional(),
  invoiceDate: z.coerce.date(),
  invoiceGrossAmount: z.coerce.number(),
  invoiceTotalAmount: z.coerce.number(),
  billingAddressId: z.string().optional(),
  shippingAddressId: z.string().optional(),
  invoiceItems: z.array(SalesInvoiceItemObject),
  paymentModeId: z.string(),
  paymentMode: PaymentModeSchema.optional(),
  // shippingAddress: ShippingAddressObject.optional(),
  // billingAddress: BillingAddressObject.optional(),
  customer: CustomerSchema.optional(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type SalesInvoice = z.infer<typeof SalesInvoiceSchema>;
