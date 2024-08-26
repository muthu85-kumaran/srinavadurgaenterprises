"use server";
import { ProductDiscount, ProductDiscountSchema } from "@/types/Discount";
import db from "@/db/database";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/utils";
import { ZodIssue } from "zod";

export const SaveProductDiscountAction = async (
  newProductDiscount: unknown
) => {
  var responseData: unknown | ProductDiscount;
  var error: unknown | string | ZodIssue[];

  const validation = await ProductDiscountSchema.safeParseAsync(
    newProductDiscount
  );

  if (!validation.success && validation.error.errors.length > 0) {
    error = validation.error.issues;
  }

  const data = validation.data; // Ensure data is not undefined

  try {
    if (data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        responseData = await db.discount.update({
          where: { id: data.id as string },
          data: data,
        });
      } else {
        data.id = undefined;
        const existingDiscount = await db.discount.findFirst({
          where: {
            discountInAmount: data.discountInAmount,
            discountInPercent: data.discountInPercent,
            discountStartDate: data.discountStartDate,
            discountEndDate: data.discountEndDate,
          },
        });
        if (existingDiscount) {
          error = "Discount already exists with this value.";
        }
        responseData = await db.discount.create({ data });
      }
    } else error = "Please Enter a valid Data.";
  } catch (error) {
    error = getErrorMessage(error);
  }

  if (data?.id) revalidatePath(`/admin/product/discount/${data?.id}`);
  else revalidatePath("/admin/product/add");

  return { data: responseData, error, success: true };
};

export const listProductDiscountAction = async () => {
  var data: unknown | ProductDiscount[];
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.discount.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    error = getErrorMessage(error);
  }
  return { data, error, success: true };
};

export const getProductDiscountAction = async (id: string) => {
  var data: unknown | ProductDiscount;
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.discount.findUnique({ where: { id } });
  } catch (error) {
    error = getErrorMessage(error);
  }
  return { data, error, success: true };
};
