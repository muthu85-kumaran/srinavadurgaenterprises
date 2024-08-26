import db from "@/db/database";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { objectUrl, productId } = await request.json();

  try {
    const res = await db.productImage.create({
      data: {
        imageUrl: objectUrl,
        productId,
      },
    });

    return NextResponse.json({ success: true, data: res, error: null });
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: e instanceof Error ? e.message : e?.toString(),
      },
      { status: 500 }
    );
  }
}
