import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { prisma } from "@/libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  else {
    try {
      const { userid } = req.query;

      if (!userid || typeof userid !== "string") {
        throw new Error("Invalid user id");
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          id: userid,
        },
        // To customize the result: use select to return specific fields
        select: {
          id: true,
          name: true,
          email: true,
          bio: true,
          coverImage: true,
          customTag: true,
          isActived: true,
          isVerified: true,
          followerId: true,
          followingId: true,
          profileImage: true,
        },
      });

      res.status(StatusCodes.OK).json({ ...existingUser });
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }
}
