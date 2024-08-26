"use server";
import { ProductTax, ProductTaxSchema } from "@/types/ProductTax";
import db from "@/db/database";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/utils";
import { ZodIssue } from "zod";

export const SaveProductTaxAction = async (newProductTax: unknown) => {
  var responseData: unknown | ProductTax;
  var error: unknown | string | ZodIssue[];

  const validation = await ProductTaxSchema.safeParseAsync(newProductTax);

  if (!validation.success && validation.error.errors.length > 0) {
    error = validation.error.issues;
  }

  const data = validation.data; // Ensure data is not undefined

  try {
    if (data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        responseData = await db.productTax.update({
          where: { id: data.id as string },
          data: data,
        });
      } else {
        data.id = undefined;
        const existingTax = await db.productTax.findFirst({
          where: {
            taxName: data.taxName,
            taxInPercent: data.taxInPercent,
          },
        });
        if (existingTax) {
          error = "Tax already exists with this value.";
        }
        responseData = await db.productTax.create({
          data: {
            taxName: data.taxName,
            taxInPercent: data.taxInPercent,
            effectiveDate: (data.effectiveDate as Date) || new Date(),
          },
        });
      }
    } else error = "Please Enter a valid Data.";
  } catch (error) {
    error = getErrorMessage(error);
  }

  if (data?.id) revalidatePath(`/admin/product/tax/${data?.id}`);
  else revalidatePath("/admin/product/add");
  return { data: responseData, error, success: true };
};

export const listProductTaxAction = async () => {
  var data: unknown | ProductTax[];
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.productTax.findMany();
  } catch (error) {
    error = getErrorMessage(error);
  }
  return { data, error, success: true };
};

export const getProductTaxAction = async (id: string) => {
  var data: unknown | ProductTax;
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.productTax.findUnique({ where: { id } });
  } catch (error) {
    error = getErrorMessage(error);
  }
  return { data, error, success: true };
};
