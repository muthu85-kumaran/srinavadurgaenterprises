import z from "zod";
export const PhaseSchema = z.object({
  // name: z.preprocess((val) => {
  //   return Number(val);
  // }, z.number().positive("Phase must be positive")),
  name: z
    .string()
    .min(1, "Phase must be at least 1 character")
    .max(20, "Phase must be at most 20 characters"),
  description: z.string().optional(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Phase = z.infer<typeof PhaseSchema>;
