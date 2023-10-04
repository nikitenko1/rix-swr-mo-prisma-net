import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { prisma } from "@/libs/prisma";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  else {
    const { currentUser } = await serverAuth(req, res);

    try {
      let skills;
      skills = await prisma.skill.findMany({
        where: {
          userId: currentUser.id,
        },
      });

      const users = await prisma.user.findMany({
        where: {
          AND: {
            skills: {
              some: {
                AND: {
                  name: {
                    in: skills.map((skill) => skill.name),
                  },

                  userId: {
                    not: currentUser.id,
                  },
                },
              },
            },
            id: {
              not: {
                in: currentUser.followingId.map((id) => id),
              },
            },
            isActived: true,
          },
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
        },
        orderBy: {
          isVerified: "desc",
        },
        take: 10,
      });
      res.status(StatusCodes.OK).json(users);
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }
}
