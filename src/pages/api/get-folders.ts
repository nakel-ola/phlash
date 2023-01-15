// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Folder, Request } from "@prisma/client";
import { parse } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { key } from "./cookie";

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
      res.status(405).json({ message: "Method not supported" });

    const userId = getId(req);

    if (!userId) res.status(403).json({ message: "Something went wrong" });

    const data = await prisma.folder.findMany({
      where: { userId },
      include: { requests: true },
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}

export const getId = (req: NextApiRequest) => parse(req.headers.cookie!)[key];
