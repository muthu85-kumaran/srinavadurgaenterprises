"use server";
import { PowerKw, PowerKwSchema } from "@/types/powerKw";
import db from "@/db/database";
import { revalidatePath } from "next/cache";

export const AddPowerKwAction = async (formData: FormData) => {
  const newpowerKw = {
    valueInKW: formData.get("valueInKW"),
    id: formData.get("id") || undefined,
  };

  const validation = await PowerKwSchema.safeParseAsync(newpowerKw);
  if (!validation.success && validation.error.errors.length > 0) {
    return { errors: validation.error.issues };
  }
  try {
    const data = validation.data; // Ensure data is not undefined
    if (data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        await db.powerInKW.update({
          where: { id: data.id as string },
          data: { valueInKW: data.valueInKW },
        });
      } else {
        data.id = undefined;
        const existingPowerKw = await db.powerInKW.findFirst({
          where: { valueInKW: data.valueInKW },
        });
        if (existingPowerKw) {
          return {
            errors: [
              { message: "Power in KW already exists with this value." },
            ],
          };
        }
        await db.powerInKW.create({ data });
      }
    }
  } catch (error: any) {
    return { errors: [{ message: error.message }] };
  }
  revalidatePath("/admin/masters/powerkw");
};

export const listPowerKwAction = async () => {
  return await db.powerInKW.findMany();
};

export const getPowerKwAction = async (id: string) => {
  return await db.powerInKW.findUnique({ where: { id } });
};
