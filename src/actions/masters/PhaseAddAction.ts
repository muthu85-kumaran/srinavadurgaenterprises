"use server";
import { PhaseSchema } from "@/types/phase";
import db from "@/db/database";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/utils";

export const addPhaseAction = async (formData: FormData) => {
  const newphase = {
    name: formData.get("name"),
    description: formData.get("description"),
    id: formData.get("id") || undefined,
  };

  const validation = await PhaseSchema.safeParseAsync(newphase);
  if (!validation.success && validation.error.errors.length > 0) {
    return {
      data: null,
      success: false,
      error: getErrorMessage(validation.error.issues),
    };
  }
  try {
    const data = validation.data; // Ensure data is not undefined
    if (data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        const response = await db.phase.update({
          where: { id: data.id as string },
          data: { name: data.name, description: data.description },
        });
        return { data: response, error: null, success: true };
      } else {
        data.id = undefined;
        const existingPhase = await db.phase.findFirst({
          where: { name: data.name },
        });
        if (existingPhase) {
          return {
            data: null,
            error: "Phase already exists with this name.",
            success: false,
          };
        }
        const response = await db.phase.create({ data });
        return { data: response, error: null, success: true };
      }
    }
  } catch (error: any) {
    return { data: null, error: error.message, success: false };
  }
};

export const listPhaseAction = async () => {
  try {
    const data = await db.phase.findMany();
    return { data, error: null, success: true };
  } catch (error: any) {
    return { data: null, success: false, error: error.message };
  }
};

export const getPhaseAction = async (id: string) => {
  return await db.phase.findUnique({ where: { id } });
};
