import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_: NextApiRequest, res: NextApiResponse<any>) {
  try {
    return res.status(200).json({ message: "Hello!" });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}
