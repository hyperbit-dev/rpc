import { NextApiRequest, Response } from "next";
import prisma from "@/lib/prisma";

export async function GET(req: NextApiRequest) {
  try {
    const blockchains = await prisma.blockchain.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return Response.json(blockchains, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
