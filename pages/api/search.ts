import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { prisma } from "@/libs/prisma";

async function usersResult(q: string) {
  const users = await prisma.user.findMany({
    where: {
      AND: [
        { isActived: true },
        {
          OR: [
            {
              customTag: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: q,
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    },
    // To customize the result: to explicitly include relations
    select: {
      id: true,
      name: true,
      customTag: true,
      isVerified: true,
      bio: true,
    },
    orderBy: {
      isVerified: "desc",
    },
  });
  return users;
}

async function postsResult(q: string) {
  const posts = await prisma.post.findMany({
    where: {
      body: {
        contains: q,
        mode: "insensitive",
      },
    },
    // To customize the result: to explicitly include relations
    select: {
      id: true,
      body: true,
      userId: true,
      createdAt: true,
      likesId: true,
      comments: true,
      user: {
        select: {
          id: true,
          name: true,
          customTag: true,
          isVerified: true,
        },
      },
    },
  });
  return posts;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;
  if (req.method != "GET") return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  else {
    if (!q || typeof q != "string") return res.status(StatusCodes.BAD_REQUEST).end();
    const users = await usersResult(q);
    const posts = await postsResult(q);
    const result = {
      users,
      posts,
    };
    res.status(StatusCodes.OK).json(result);
  }
}
