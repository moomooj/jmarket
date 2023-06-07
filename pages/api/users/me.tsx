import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseBody, client } from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  res.json({ ok: true, profile });
}

export default withApiSession(withHandler("GET", handler));
