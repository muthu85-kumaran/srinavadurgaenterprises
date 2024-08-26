import z from "zod";
export const VoltageSchema = z.object({
  valueInVolt: z.preprocess((val) => {
    return Number(val);
  }, z.number().positive("Voltage in Volt must be positive").min(200, "Voltage in Volt must be at least 200").max(440, "Voltage in Volt must be at most 440")),

  // valueInHP: z
  //   .string()
  //   .min(1, "PowerHp must be at least 1 character long")
  //   .max(10, "PowerHp must be at most 10 characters long"),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Voltage = z.infer<typeof VoltageSchema>;
