import { client } from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;

    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return res.json({ ok: true, post });
  }

  if (req.method === "GET") {
    const {
      query: { latitude, longitude },
    } = req;

    if (latitude && longitude) {
      const parsedLatitude = parseFloat(latitude.toString());
      const parsedLongitue = parseFloat(longitude.toString());
      const posts = await client.post.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              wondering: true,
              answers: true,
            },
          },
        },
        where: {
          latitude: {
            gte: parsedLatitude - 0.01,
            lte: parsedLatitude + 0.01,
          },
          longitude: {
            gte: parsedLongitue - 0.01,
            lte: parsedLongitue + 0.01,
          },
        },
      });

      return res.json({ ok: true, posts });
    } else {
      const posts = await client.post.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              wondering: true,
              answers: true,
            },
          },
        },
      });
      return res.json({ ok: true, posts });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
