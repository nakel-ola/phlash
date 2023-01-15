// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { getId } from "./get-folders";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "DELETE")
      res.status(405).json({ message: "Method not supported" });

    const userId = getId(req);
    if (!userId) res.status(403).json({ message: "Something went wrong" });

    await prisma.folder.deleteMany({
      where: {
        AND: { userId },
      },
    });

    res.status(200).json({ message: "Deleted successfuly" });
  } catch (error) {
    console.log(error);
  }
}
