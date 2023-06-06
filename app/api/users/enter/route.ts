import { client } from "@/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  const { phone, email } = await req.json();
  const payload = phone ? { phone: +phone } : { email };

  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "Anonymous",
      ...payload,
    },
    update: {},
  });

  /*
  if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("유저 찾았음!");
    if (!user) {
      console.log("유저 못찾아서 만들겠음!");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
  }

  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log("유저 찾았음!!");
    if (!user) {
      console.log("유저 못찾아서 만들겠음!!");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: +phone,
        },
      });
    }
  }*/
  return NextResponse.json({ ok: true });
}
