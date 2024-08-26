"use server";
import { PumpTypeIns, PumpTypeInsSchema } from "@/types/pumpTypeIns";
import db from "@/db/database";
import { revalidatePath } from "next/cache";

export const AddPumpTypeInsAction = async (formData: FormData) => {
  const newPumpTypeIns = {
    name: formData.get("name"),
    description: formData.get("description"),
    id: formData.get("id") || undefined,
  };

  const validation = await PumpTypeInsSchema.safeParseAsync(newPumpTypeIns);
  if (!validation.success && validation.error.errors.length > 0) {
    return { errors: validation.error.issues };
  }
  try {
    const data = validation.data; // Ensure data is not undefined
    if (data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        await db.pumpTypeInstallation.update({
          where: { id: data.id as string },
          data: { name: data.name, description: data.description },
        });
      } else {
        data.id = undefined;
        const existingPumpTypeIns = await db.pumpTypeInstallation.findFirst({
          where: { name: data.name },
        });
        if (existingPumpTypeIns) {
          return {
            errors: [
              {
                message:
                  "Pump Type Installation already exists with this name.",
              },
            ],
          };
        }
        await db.pumpTypeInstallation.create({ data });
      }
    }
  } catch (error: any) {
    return { errors: [{ message: error.message }] };
  }
  revalidatePath("/admin/masters/pumptypeins");
};

export const listPumpTypeInsAction = async () => {
  return await db.pumpTypeInstallation.findMany();
};

export const getPumpTypeInsAction = async (id: string) => {
  return await db.pumpTypeInstallation.findUnique({ where: { id } });
};
