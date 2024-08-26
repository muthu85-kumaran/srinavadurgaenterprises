"use server";
import { Voltage, VoltageSchema } from "@/types/Voltage";
import db from "@/db/database";
import { revalidatePath } from "next/cache";

export const AddVoltageAction = async (formData: FormData) => {
  const newVoltage = {
    valueInVolt: formData.get("valueInVolt"),
    id: formData.get("id") || undefined,
  };

  const validation = await VoltageSchema.safeParseAsync(newVoltage);
  if (!validation.success && validation.error.errors.length > 0) {
    return { errors: validation.error.issues };
  }
  try {
    const data = validation.data; // Ensure data is not undefined
    if (data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        await db.ratedVoltageINVolt.update({
          where: { id: data.id as string },
          data: { valueInVolt: data.valueInVolt },
        });
      } else {
        data.id = undefined;
        const existingVoltage = await db.ratedVoltageINVolt.findFirst({
          where: { valueInVolt: data.valueInVolt },
        });
        if (existingVoltage) {
          return {
            errors: [{ message: "Voltage already exists with this value." }],
          };
        }
        await db.ratedVoltageINVolt.create({ data });
      }
    }
  } catch (error: any) {
    return { errors: [{ message: error.message }] };
  }
  revalidatePath("/admin/voltage");
};

export const listVoltageAction = async () => {
  return await db.ratedVoltageINVolt.findMany();
};

export const getVoltageAction = async (id: string) => {
  return await db.ratedVoltageINVolt.findUnique({ where: { id } });
};
