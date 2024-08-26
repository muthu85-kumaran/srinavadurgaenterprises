"use server";
import { PaymentMode, PaymentModeSchema } from "@/types/PaymentMode";
import { getErrorMessage } from "@/lib/utils";
import { ZodIssue } from "zod";
import db from "@/db/database";

export const SavePaymentModeAction = async (newPaymentMode: PaymentMode) => {
  const validation = PaymentModeSchema.safeParse(newPaymentMode);

  if (validation.error) {
    const error = validation.error.format();
    return { data: null, error, success: false };
  }

  const data = validation.data!!; // Ensure data is not undefined

  try {
    if (validation.success && validation.data) {
      if (data.id) {
        const existingPaymentMode = await db.paymentMode.findUnique({
          where: { id: data.id },
        });

        if (!existingPaymentMode) {
          const error = "Payment Mode not found.";
          return { data: null, error, success: false };
        }

        const result = await db.paymentMode.update({
          where: { id: data.id },
          data,
        });
        return { data: result, error: null, success: true };
      } else {
        data.id = undefined;
        const existingPaymentMode = await db.paymentMode.findUnique({
          where: { name: data.name },
        });

        if (existingPaymentMode) {
          const error = "Payment Mode already exists with this name.";
          return { data: null, error, success: false };
        }

        const result = await db.paymentMode.create({
          data,
        });
        return { data: result, error: null, success: true };
      }
    }
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const listPaymentModeAction = async () => {
  try {
    const responseData = await db.paymentMode.findMany();
    return { data: responseData, error: null, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const listPaymentModeWithoutCreditAction = async () => {
  try {
    const responseData = await db.paymentMode.findMany({
      where: { name: { not: "Credit" } },
    });
    return { data: responseData, error: null, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const getPaymentModeAction = async (id: string) => {
  try {
    const responseData = await db.paymentMode.findUnique({
      where: { id },
    });
    console.log(responseData);
    return { data: responseData, error: null, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};
