// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Folder } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import clean from "../../utils/clean";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Folder>
) {
  try {
    if (req.method !== "PATCH")
      return res.status(405).json({ message: "Method not supported" });

    const { id, groupName, userId } = req.body;
    if (!userId)
      return res.status(403).json({ message: "Something went wrong" });

    const data = await prisma.folder.update({
      where: {
        id,
      },
      data: clean({
        name: groupName,
      }),
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
