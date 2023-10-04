import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { prisma } from "@/libs/prisma";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "GET") return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  else {
    try {
      const { nestedreplayId } = req.query;
      if (!nestedreplayId || typeof nestedreplayId != "string")
        throw new Error("Invalid nestedreplay id");

      const nestedreplay = await prisma.nestedReplay.findUnique({
        where: {
          id: nestedreplayId,
        },
        include: {
          user: {
            // To customize the result: use select to return specific fields
            select: {
              id: true,
              name: true,
              customTag: true,
              isVerified: true,
            },
          },
          replay: true,
        },
      });

      return res.status(StatusCodes.OK).json(nestedreplay);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}
