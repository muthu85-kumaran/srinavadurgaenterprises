import z from "zod";
export const DeliverySchema = z.object({
  valueDeliverySize: z.preprocess((val) => {
    return Number(val);
  }, z.number({ required_error: "Delivery Size in (MM) is required" }).positive("Delivery in MM must be positive").min(10, "Delivery in MM must be at least 10").max(1000, "Delivery in MM must be at most 1000")),

  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Delivery = z.infer<typeof DeliverySchema>;
