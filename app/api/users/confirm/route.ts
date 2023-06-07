import { client } from "@/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  const { token } = await req.json();
  console.log(token);

  return NextResponse.json({ status: 200 });
}
