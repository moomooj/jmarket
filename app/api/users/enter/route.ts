import { ResponseBody, client } from "@/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request): Promise<NextResponse<ResponseBody>> {
  const { phone, email } = await req.json();
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return NextResponse.json({ ok: false }, { status: 400 });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
