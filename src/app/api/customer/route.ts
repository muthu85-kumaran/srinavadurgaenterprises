import { NextRequest, NextResponse } from "next/server";
import db from "@/db/database";
import { Customer } from "@prisma/client";
import { error } from "console";
export async function GET(request: NextRequest) {
  try {
    const contactNo = request.nextUrl.searchParams.get("contactNo");
    const email = request.nextUrl.searchParams.get("email");
    if (contactNo) {
      const customer = await db.customer.findUnique({
        where: { contactNo },
      });
      return NextResponse.json({
        success: true,
        data: customer,
        error: null,
      });
    }
    if (email) {
      const customer = await db.customer.findUnique({
        where: { email },
      });
      return NextResponse.json({
        success: true,
        data: customer,
        error: null,
      });
    }
    const customers = await db.customer.findMany();
    return NextResponse.json({ success: true, data: customers, error: null });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
