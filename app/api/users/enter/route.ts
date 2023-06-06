import { client } from "@/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  return NextResponse.json({ ok: true });
}
