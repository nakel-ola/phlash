// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { parse, serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

type Data = {
  message?: string;
  id?: string;
};

export let key = "authId";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ message: "Method not supported" });
      return;
    }

    const id = v4();
    const authId = parse(req.headers.cookie!)[key];
    const production = process.env.NODE_ENV === "production";

    console.log(production)

    if (!authId) {
      res.setHeader(
        "Set-Cookie",
        serialize(key, id, {
          path: "/",
          maxAge: 604_800_000,
          sameSite: production ? "lax" : false,
          httpOnly: true,
          secure: production,
        })
      );
    }

    res.status(200).json({ id: authId ?? id });
  } catch (error) {
    console.log(error);
  }
}
