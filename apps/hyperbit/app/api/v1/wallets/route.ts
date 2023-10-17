import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { ResponseError } from "@/types/api";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { DbWallet } from "@/lib/db/wallet/types";

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

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  try {
    const wallets = await prisma.wallet.findMany({
      where: {
        userId: {
          equals: token?.id as string,
        },
      },
      include: { blockchain: true },
      orderBy: { name: "asc" },
    });
    const walletsWithoutPassphrase = wallets.map((wallets) =>
      exclude(wallets, ["passphrase"])
    );
    return NextResponse.json(walletsWithoutPassphrase, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<DbWallet | any | ResponseError>> {
  const token = await getToken({ req });
  const { name, blockchainId, passphrase } = await req.json();

  if (!name || !blockchainId || !passphrase) {
    return NextResponse.json(
      { messge: "Missing required fields" },
      { status: 400 }
    );
  }

  let hashedPassphrase;
  if (passphrase) {
    hashedPassphrase = await bcrypt.hash(passphrase, 10);
  }

  try {
    const blockchain = await prisma.blockchain.findFirst({
      where: {
        chainId: {
          equals: blockchainId,
        },
      },
    });
    const wallet = await prisma.wallet.create({
      data: {
        name,
        userId: token?.id as string,
        blockchainId: (blockchain?.id as string) ?? blockchainId,
        passphrase: hashedPassphrase,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        blockchainId: true,
        active: true,
        favorite: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(wallet, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
