import { client } from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
    });
    return res.json({ ok: true, profile });
  }

  if (req.method === "POST") {
    const {
      session: { user },
      body: { email, phone, name, avatarId },
    } = req;

    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (email && email !== currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "이메일이 이미 사용중입니다.",
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
      return res.json({ ok: true });
    }
    if (phone && phone !== currentUser?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "전화번호가 이미 사용중입니다.",
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      });
      return res.json({ ok: true });
    }
    if (name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
    }
    if (avatarId) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          avatar: avatarId,
        },
      });
    }

    return res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
