import { client } from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req;

  const stream = await client.stream.findUnique({
    where: { id: Number(id) },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: { select: { avatar: true, id: true } },
        },
      },
    },
  });

  if (!stream) return res.json({ ok: false });

  return res.json({ ok: true, stream });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
