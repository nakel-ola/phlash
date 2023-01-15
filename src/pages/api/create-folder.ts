// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Folder, Request } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import clean from "../../utils/clean";
import { ErrorMsg } from "./get-folders";

type Data = Folder & {
  requests: Request[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorMsg>
) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ message: "Method not supported" });

    const { groupName, title, method, url, userId } = req.body;
    if (!userId) return res.status(403).json({ message: "Something went wrong" });

    const data = await prisma.folder.create({
      data: {
        name: groupName,
        userId,
        requests: {
          createMany: {
            data: clean({
              title,
              userId,
              method,
              url,
            }),
          },
        },
      },
      include: { requests: true },
    });

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
}
