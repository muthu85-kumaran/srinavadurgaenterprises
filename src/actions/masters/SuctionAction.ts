"use server";
import { Suction, SuctionSchema } from "@/types/Suction";
import db from "@/db/database";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/utils";
import { ZodIssue } from "zod";

export const SaveSuctionAction = async (newSuction: unknown) => {
  var responseData: unknown | Suction;
  var error: unknown | string | ZodIssue[];

  const validation = await SuctionSchema.safeParseAsync(newSuction);

  if (!validation.success && validation.error.errors.length > 0) {
    error = validation.error.issues;
  }

  const data = validation.data; // Ensure data is not undefined

  try {
    if (data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        responseData = await db.suctionSizeINMM.update({
          where: { id: data.id as string },
          data: { valueSuctionSize: data.valueSuctionSize },
        });
      } else {
        data.id = undefined;
        const existingSuction = await db.suctionSizeINMM.findFirst({
          where: { valueSuctionSize: data.valueSuctionSize },
        });
        if (existingSuction) {
          error = "Suction already exists with this value.";
        }
        responseData = await db.suctionSizeINMM.create({ data });
      }
    } else error = "Please Enter a valid Data.";
  } catch (error) {
    error = getErrorMessage(error);
  }

  if (data?.id) revalidatePath("/admin/masters/suction/add");
  else revalidatePath(`/admin/masters/suction/${data?.id}`);

  return { data: responseData, error, success: true };
};

export const listSuctionAction = async () => {
  var data: unknown | Suction[];
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.suctionSizeINMM.findMany();
  } catch (error) {
    error = getErrorMessage(error);
  }
  return { data, error, success: true };
};

export const getSuctionAction = async (id: string) => {
  var data: unknown | Suction;
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.suctionSizeINMM.findUnique({ where: { id } });
  } catch (error) {
    error = getErrorMessage(error);
  }
  return { data, error, success: true };
};
