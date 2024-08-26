"use server";
import { PumpTypeApp, PumpTypeAppSchema } from "@/types/pumpTypeApp";
import db from "@/db/database";
import { revalidatePath } from "next/cache";

export const AddPumpTypeAppAction = async (formData: FormData) => {
  const newpumptypeapp = {
    name: formData.get("name"),
    description: formData.get("description"),
    id: formData.get("id") || undefined,
  };

  const validation = await PumpTypeAppSchema.safeParseAsync(newpumptypeapp);
  if (!validation.success && validation.error.errors.length > 0) {
    return { errors: validation.error.issues };
  }
  try {
    const data = validation.data; // Ensure data is not undefined
    if (data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        await db.pumpTypeApp.update({
          where: { id: data.id as string },
          data: { name: data.name, description: data.description },
        });
      } else {
        data.id = undefined;
        const existingPumpTypeApp = await db.pumpTypeApp.findFirst({
          where: { name: data.name },
        });
        if (existingPumpTypeApp) {
          return {
            errors: [
              { message: "Pump Type App already exists with this name." },
            ],
          };
        }
        await db.pumpTypeApp.create({ data });
      }
    }
  } catch (error: any) {
    return { errors: [{ message: error.message }] };
  }
  revalidatePath("/admin/masters/pumptypeapp");
};

export const listPumpTypeAppAction = async () => {
  return await db.pumpTypeApp.findMany();
};

export const getPumpTypeAppAction = async (id: string) => {
  return await db.pumpTypeApp.findUnique({ where: { id } });
};
