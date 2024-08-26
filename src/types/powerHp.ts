import z from "zod";
export const PowerHpSchema = z.object({
  valueInHP: z.preprocess((val) => {
    return Number(val);
  }, z.number().positive("Power in Hp must be positive").min(0.1, "Power in Hp must be at least 0.1").max(1000, "Power in Hp must be at most 1000")),

  // valueInHP: z
  //   .string()
  //   .min(1, "PowerHp must be at least 1 character long")
  //   .max(10, "PowerHp must be at most 10 characters long"),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type PowerHp = z.infer<typeof PowerHpSchema>;
