import z from "zod";
export const ProductDiscountSchema = z
  .object({
    discountInPercent: z.preprocess((val) => {
      return Number(val);
    }, z.number().optional()),
    discountInAmount: z.preprocess((val) => {
      return Number(val);
    }, z.number().optional()),
    discountStartDate: z.coerce.date(),
    discountEndDate: z.coerce.date(),
    id: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .refine((data) => discountValueOrPercentage(data), {
    message: "Either discount Amount or Percentage should be provided",
    path: ["discountInPercent", "discountInAmount"],
  })
  .refine(validTillAfterValidFrom, {
    message: "Valid Till should be after Valid From",
    path: ["discountEndDate"],
  })
  .refine(validFromBeforeToday, {
    message: "Valid From should be after today",
    path: ["discountStartDate"],
  })
  .refine(validTillBeforeToday, {
    message: "Valid Till should be after today",
    path: ["discountEndDate"],
  })
  .refine(discountValueAndPercentage, {
    message: "Both Discount in Amount and Percentage cannot be provided",
    path: ["discountInAmount"],
  });

function discountValueOrPercentage(data: any) {
  return data.discountInAmount != 0 || data.discountInPercent != 0;
}
function validTillAfterValidFrom(data: any) {
  return data.discountEndDate > data.discountStartDate;
}
function validFromBeforeToday(data: any) {
  return data.discountStartDate > new Date();
}
function validTillBeforeToday(data: any) {
  return data.discountEndDate > new Date();
}

function discountValueAndPercentage(data: any) {
  return !(data.discountInAmount && data.discountInPercent);
}
export type ProductDiscount = z.infer<typeof ProductDiscountSchema>;
