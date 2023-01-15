// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Request } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { ErrorMsg, getId } from "./get-folders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Request | ErrorMsg>
) {
  try {
    if (req.method !== "POST")
      res.status(405).json({ message: "Method not supported" });

    const userId = getId(req);
    if (!userId) res.status(403).json({ message: "Something went wrong" });

    const { title, method, url, folderId } = req.body;

    const data = await prisma.request.create({
      data: {
        title,
        method,
        url,
        userId,
        folderId,
      },
    });
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
  }
}
