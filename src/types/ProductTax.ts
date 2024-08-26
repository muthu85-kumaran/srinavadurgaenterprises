import z from "zod";
export const ProductTaxSchema = z.object({
  taxInPercent: z.preprocess((val) => {
    return Number(val);
  }, z.number({ required_error: "Tax in Percent is required" }).positive("Tax must be positive value").min(0.1, "Tax must be at least 0.1").max(100, "Tax must be at almost 100")),
  taxName: z
    .string({ required_error: "Tax Name is required" })
    .min(1, "Tax Name is required")
    .max(50, "Tax Name must be at most 50 characters"),
  effectiveDate: z.coerce.date().optional(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ProductTax = z.infer<typeof ProductTaxSchema>;
