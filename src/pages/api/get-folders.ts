// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Folder, Request } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

type Data = Folder & {
  requests: Request[];
};

export type ErrorMsg = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorMsg | Data[]>
) {
  try {
    if (req.method !== "GET")
      return res.status(405).json({ message: "Method not supported" });

    const userId = req.query?.userId?.toString();

    if (!userId)
      return res.status(403).json({ message: "Something went wrong" });

    const data = await prisma.folder.findMany({
      where: { userId },
      include: { requests: true },
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
