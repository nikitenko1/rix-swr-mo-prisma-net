import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { prisma } from "@/libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "GET") return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  else {
    try {
      const { userId } = req.query;
      if (!userId || typeof userId != "string") throw new Error("Invalid user id");

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        // To customize the result: use select to return specific fields
        select: {
          followingId: true,
        },
      });

      const followingIds = user?.followingId || [];

      const following = await prisma.user.findMany({
        where: { id: { in: followingIds } },
      });

      res.status(StatusCodes.OK).json(following);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}
