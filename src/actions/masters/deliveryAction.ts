"use server";
import { Delivery, DeliverySchema } from "@/types/Delivery";
import db from "@/db/database";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/utils";
import { ZodIssue } from "zod";

export const SaveDeliveryAction = async (newDelivery: Delivery) => {
  var responseData: unknown | Delivery;
  var error: unknown | string | ZodIssue[];

  const validation = DeliverySchema.safeParse(newDelivery);

  if (validation.error) {
    error = validation.error.format();
    return { data: null, error, success: false };
  }

  const data = validation.data; // Ensure data is not undefined

  try {
    if (data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        responseData = await db.deliverySizeINMM.update({
          where: { id: data.id as string },
          data: { valueDeliverySize: data.valueDeliverySize },
        });
        return { data: responseData, error, success: true };
      } else {
        data.id = undefined;
        const existingDelivery = await db.deliverySizeINMM.findFirst({
          where: { valueDeliverySize: data.valueDeliverySize },
        });
        if (existingDelivery) {
          error = "Delivery already exists with this value.";
          return { data: null, error, success: false };
        }
        responseData = await db.deliverySizeINMM.create({ data });
        return { data: responseData, error, success: true };
      }
    } else {
      error = "Please Enter a valid Data.";
      return { data: null, error, success: false };
    }
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const listDeliveryAction = async () => {
  var data: unknown | Delivery[];
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.deliverySizeINMM.findMany();
    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const getDeliveryAction = async (id: string) => {
  var data: unknown | Delivery;
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.deliverySizeINMM.findUnique({ where: { id } });
    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};
