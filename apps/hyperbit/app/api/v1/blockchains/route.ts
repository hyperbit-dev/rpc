import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const blockchains = await prisma.blockchain.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(blockchains, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
