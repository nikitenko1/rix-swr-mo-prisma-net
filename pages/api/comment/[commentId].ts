import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { prisma } from "@/libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "GET") return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  else {
    try {
      const { commentId } = req.query;
      if (!commentId || typeof commentId != "string") throw new Error("Invalid id");

      const comment = await prisma.comment.findUnique({
        where: {
          id: commentId,
        },
        include: {
          user: true,
          replays: true,
        },
      });

      res.status(StatusCodes.OK).json(comment);
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }
}
