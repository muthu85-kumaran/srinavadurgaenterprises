import z from "zod";
export const PaymentModeSchema = z.object({
  name: z
    .string()
    .min(1, "PaymentMode must be at least 1 character")
    .max(20, "PaymentMode must be at most 20 characters"),
  description: z.string().optional(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type PaymentMode = z.infer<typeof PaymentModeSchema>;
