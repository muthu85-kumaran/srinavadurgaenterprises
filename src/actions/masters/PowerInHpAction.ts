"use server";
import { PowerHp, PowerHpSchema } from "@/types/powerHp";
import db from "@/db/database";
import { revalidatePath } from "next/cache";

export const AddPowerHPAction = async (formData: FormData) => {
  const newpowerHp = {
    valueInHP: formData.get("valueInHP"),
    id: formData.get("id") || undefined,
  };

  const validation = await PowerHpSchema.safeParseAsync(newpowerHp);
  if (!validation.success && validation.error.errors.length > 0) {
    return { errors: validation.error.issues };
  }
  try {
    const data = validation.data; // Ensure data is not undefined
    if (data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        await db.powerInHP.update({
          where: { id: data.id as string },
          data: { valueInHP: data.valueInHP },
        });
      } else {
        data.id = undefined;
        const existingPowerHp = await db.powerInHP.findFirst({
          where: { valueInHP: data.valueInHP },
        });
        if (existingPowerHp) {
          return {
            errors: [{ message: "Power already exists with this value." }],
          };
        }
        await db.powerInHP.create({ data });
      }
    }
  } catch (error: any) {
    return { errors: [{ message: error.message }] };
  }
  revalidatePath("/admin/masters/powerhp");
};

export const listPowerHpAction = async () => {
  return await db.powerInHP.findMany();
};

export const getPowerHpAction = async (id: string) => {
  return await db.powerInHP.findUnique({ where: { id } });
};
