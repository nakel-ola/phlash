// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Folder } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import clean from "../../utils/clean";
import { getId } from "./get-folders";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Folder>
) {
  try {
    if (req.method !== "PATCH")
      res.status(405).json({ message: "Method not supported" });

    const userId = getId(req);
    if (!userId) res.status(403).json({ message: "Something went wrong" });

    const { id, groupName } = req.body;

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
