import { client } from "@/libs/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  await client.user.create({
    data: {
      name: "주영213asdssasdd2dd",
    },
  });

  return NextResponse.json({
    ok: true,
    data: "xx",
  });
}
