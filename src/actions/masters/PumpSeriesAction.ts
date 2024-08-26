"use server";
import { PumpSeries, PumpSeriesSchema } from "@/types/pumpSeries";
import db from "@/db/database";
import { revalidatePath } from "next/cache";

export const addPumpSeriesAction = async (formData: FormData) => {
  const newpumpseries = {
    name: formData.get("name"),
    description: formData.get("description"),
    id: formData.get("id") || undefined,
  };

  const validation = await PumpSeriesSchema.safeParseAsync(newpumpseries);
  if (!validation.success && validation.error.errors.length > 0) {
    return { errors: validation.error.issues };
  }
  try {
    const data = validation.data; // Ensure data is not undefined
    if (data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        await db.productSeries.update({
          where: { id: data.id as string },
          data: { name: data.name, description: data.description },
        });
      } else {
        data.id = undefined;
        const existingPumpSeries = await db.productSeries.findFirst({
          where: { name: data.name },
        });
        if (existingPumpSeries) {
          return {
            errors: [{ message: "Pump Series already exists with this name." }],
          };
        }
        await db.productSeries.create({ data });
      }
    }
  } catch (error: any) {
    return { errors: [{ message: error.message }] };
  }
  revalidatePath("/admin/masters/pumpseries");
};

export const listPumpSeriesAction = async () => {
  return await db.productSeries.findMany();
};

export const getPumpSeriesAction = async (id: string) => {
  return await db.productSeries.findUnique({ where: { id } });
};
