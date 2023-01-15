// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Request } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { ErrorMsg } from "./get-folders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Request | ErrorMsg>
) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ message: "Method not supported" });

    const { title, method, url, folderId, userId } = req.body;
    if (!userId) return res.status(403).json({ message: "Something went wrong" });

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
