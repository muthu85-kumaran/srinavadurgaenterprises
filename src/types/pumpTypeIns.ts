import z from "zod";
export const PumpTypeInsSchema = z.object({
  // name: z.preprocess((val) => {
  //   return Number(val);
  // }, z.number().positive("PumpTypeIns must be positive")),
  name: z
    .string()
    .min(1, "Pump Type Installation must be at least 1 character")
    .max(20, "Pump Type Installation must be at most 20 characters"),
  description: z.string().optional(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type PumpTypeIns = z.infer<typeof PumpTypeInsSchema>;
