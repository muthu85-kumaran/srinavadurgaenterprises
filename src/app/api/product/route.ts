import { NextRequest, NextResponse } from "next/server";
import db from "@/db/database";
import { ProductSchema } from "@/types/Product";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const requestBody = ProductSchema.safeParse(body);

  if (!requestBody.success) {
    // If validation errors, map them into an object
    const serverErrors = Object.fromEntries(
      requestBody.error?.issues?.map((issue) => [
        issue.path[0],
        issue.message,
      ]) || []
    );
    // console.log(serverErrors);
    return NextResponse.json(
      {
        success: false,
        message: "Invalid data",
        serverErrors,
      },
      { status: 400 }
    );
  }

  try {
    const product = await db.product.create({
      data: requestBody.data,
    });
    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
