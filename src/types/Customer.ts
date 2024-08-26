import z from "zod";
export const CustomerSchema = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 character long")
    .max(100, "Name must be at most 100 characters long"),
  companyName: z.string().optional(),

  balanceType: z.string().optional(),
  openingBalance: z
    .preprocess((val) => {
      return Number(val);
    }, z.number())
    .optional(),
  gstin: z.string().optional(),
  pan: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  contactNo: z
    .string()
    .min(10, "Contact No must be at least 10 characters long"),
  address: z.string().max(250, "Address must be at most 250 characters"),
  city: z.string().min(3, "City must be at least 3 character long"),
  state: z.string().min(2, "State must be at least 2 character long"),
  pincode: z.string().min(6, "Pincode must be at least 6 character long"),
  country: z.string().optional(),
  userId: z.string().optional(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Customer = z.infer<typeof CustomerSchema>;
