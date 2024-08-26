import z from "zod";
export const SuctionSchema = z.object({
  valueSuctionSize: z.preprocess((val) => {
    return Number(val);
  }, z.number().positive("Suction in MM must be positive").min(10, "Suction in MM must be at least 10").max(1000, "Suction in MM must be at most 1000")),

  // valueInHP: z
  //   .string()
  //   .min(1, "PowerHp must be at least 1 character long")
  //   .max(10, "PowerHp must be at most 10 characters long"),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Suction = z.infer<typeof SuctionSchema>;
