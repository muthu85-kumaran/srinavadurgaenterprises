import z from "zod";
export const PowerKwSchema = z.object({
  valueInKW: z.preprocess((val) => {
    return Number(val);
  }, z.number().positive("Power in KW must be positive").min(0.1, "Power in KW must be at least 0.1").max(1000, "Power in KW must be at most 1000")),

  // valueInHP: z
  //   .string()
  //   .min(1, "PowerHp must be at least 1 character long")
  //   .max(10, "PowerHp must be at most 10 characters long"),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type PowerKw = z.infer<typeof PowerKwSchema>;
