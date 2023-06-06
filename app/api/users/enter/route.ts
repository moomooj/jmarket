import { client } from "@/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  const { phone, email } = await req.json();
  let user;
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
        phone,
      },
    });
    if (user) console.log("유저 찾았음!");
    if (!user) {
      console.log("유저 못찾아서 만들겠음!");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone,
        },
      });
    }
  }
  return NextResponse.json({ ok: true });
}
