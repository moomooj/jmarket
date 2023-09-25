import { client } from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { makeSignature } from "@libs/server/sens";
import smtpTransport from "@libs/server/email";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });

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
    /*
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
    });*/
  } else if (email) {
    /*
    const mailOptions = {
      from: `${process.env.MAIL_ID}@naver.com`,
      to: email,
      subject: "Nomad Carrot Authentication Email",
      text: `Authentication Code : ${payload}`,
    };

    const result = await smtpTransport.sendMail(
      mailOptions,
      (error, responses) => {
        if (error) {
          return null;
        } else {
          return null;
        }
      }
    );
    smtpTransport.close();*/
  }

  return res.json({ ok: true });
}

export default withHandler({ method: "POST", handler, isPrivate: false });
