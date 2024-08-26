import z from "zod";
export const PumpTypeAppSchema = z.object({
  // name: z.preprocess((val) => {
  //   return Number(val);
  // }, z.number().positive("PumpTypeApp must be positive")),
  name: z
    .string()
    .min(1, "Pump Type Application must be at least 1 character")
    .max(20, "Pump Type Application must be at most 20 characters"),
  description: z.string().optional(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type PumpTypeApp = z.infer<typeof PumpTypeAppSchema>;
