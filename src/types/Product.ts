import path from "path";
import z from "zod";
export const ProductSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    normalPrice: z.preprocess((val) => {
      return Number(val);
    }, z.number({ required_error: "Price is required" }).positive("Price must be positive value").min(0.1, "Price must be at least 0.1")),
    retailPrice: z.preprocess((val) => {
      return Number(val);
    }, z.number({ required_error: "Retail Price is required" }).positive("Retail Price must be positive value").min(0.1, "Retail Price must be at least 0.1")),

    modelNo: z
      .string({ required_error: "Model Number is required" })
      .min(3, "Model Number must be at least 3 characters long"),
    frequency: z.string(),
    noOfStages: z.string(),
    grossWeight: z.string(),
    certification: z.string(),
    headMinimumM: z.string(),
    headMaximumM: z.string(),
    sealingType: z.string(),
    isTaxIncludedInPrice: z.boolean(),
    stockQuantity: z.preprocess((val) => {
      return Number(val);
    }, z.number()),
    minOrderQuantity: z.preprocess((val) => {
      return Number(val);
    }, z.number().optional()),
    hsnCode: z.string().optional(),
    isAvailable: z.boolean(),
    seriesId: z
      .string({ required_error: "Series is required" })
      .min(1, "Series is required"),
    puTypeAppId: z
      .string({ required_error: "Pump Type (Application) is required" })
      .min(1, "Pump Type (Application) is required"),
    puTypeInstId: z
      .string({ required_error: "Pump Type (Installation) is required" })
      .min(1, "Pump Type (Installation) is required"),
    phaseId: z
      .string({ required_error: "Phase is required" })
      .min(1, "Phase is required"),
    powerHPId: z
      .string({ required_error: "Power (HP) is required" })
      .min(1, "Power (HP) is required"),
    ratedVoltId: z
      .string({ required_error: "Rated Voltage is required" })
      .min(1, "Rated Voltage is required"),
    powerKWId: z
      .string({ required_error: "Power (KW) is required" })
      .min(1, "Power (KW) is required"),
    suctionMMId: z
      .string({ required_error: "Suction (MM) is required" })
      .min(1, "Suction (MM) is required"),
    deliveryMMId: z
      .string({ required_error: "Delivery (MM) is required" })
      .min(1, "Delivery (MM) is required"),
    productTaxId: z
      .string({ required_error: "Product Tax is required" })
      .min(1, "Product Tax is required"),
    cessInPercent: z
      .preprocess((val) => {
        return Number(val);
      }, z.number())
      .optional(),
    discountId: z.string().optional(),
    id: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.normalPrice < data.retailPrice) {
        return false;
      }
      return true;
    },
    {
      message: "Retail Price must be Less than Normal Price",
      path: ["retailPrice"],
    }
  )
  .refine(
    (data) => {
      if (data.stockQuantity < 0) {
        return false;
      }
      return true;
    },
    {
      message: "Stock Quantity must be positive value",
      path: ["stockQuantity"],
    }
  );

export type Product = z.infer<typeof ProductSchema>;
