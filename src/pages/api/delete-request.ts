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

    const { id } = req.body;

    await prisma.request.deleteMany({
      where: {
        AND: { id, userId },
      },
    });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
  }
}
