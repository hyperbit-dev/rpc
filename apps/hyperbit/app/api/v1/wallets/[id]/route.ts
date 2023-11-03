import bcrypt from "bcrypt";
import { NextApiRequest, Response } from "next";
import { ResponseError } from "@/types/api";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

function exclude<Wallet, Key extends keyof Wallet>(
  wallet: Wallet,
  keys: Key[]
): Omit<Wallet, Key> {
  // @ts-ignore
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(wallet).filter(([key]) => !keys.includes(key))
  );
}

export async function GET(
  req: NextApiRequest,
  {
    params: { id },
  }: {
    params: {
      id: string;
    };
  }
) {
  const token = await getToken({ req });
  try {
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: token?.id as string,
        id,
      },
      include: { blockchain: true },
    });
    const walletWithoutPassphrase = wallet
      ? exclude(wallet, ["passphrase"])
      : null;
    return Response.json(walletWithoutPassphrase, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}