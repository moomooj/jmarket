import { ResponseBody, client } from "@/libs/server/client";
import { makeSignature } from "@/libs/server/sens";
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

  if (phone) {
    const signature = makeSignature();

    const body = {
      type: "SMS",
      contentType: "COMM",
      countryCode: "82",
      from: process.env.MY_PHONE,
      content: `인증번호는 [${payload}] 입니다.`,
      messages: [
        {
          to: phone,
        },
      ],
    };

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "x-ncp-apigw-timestamp": Date.now().toString(),
      "x-ncp-iam-access-key": `${process.env.NAVER_ACCESS_KEY_ID}`,
      "x-ncp-apigw-signature-v2": signature,
    };

    await fetch(
      `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.NAVER_SENS_SMS_ID}/messages`,
      { method: "POST", body: JSON.stringify(body), headers }
    ).catch((err) => {
      console.error(err.response.data);
    });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
