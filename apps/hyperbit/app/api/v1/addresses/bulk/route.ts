import bcrypt from "bcrypt";
import { NextApiRequest, Response } from "next";
import { ResponseError } from "@/types/api";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

function exclude<Address, Key extends keyof Address>(
  wallet: Address,
  keys: Key[]
): Omit<Address, Key> {
  // @ts-ignore
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(wallet).filter(([key]) => !keys.includes(key))
  );
}

export async function POST(
  req: NextApiRequest
): Promise<any> {
  const token = await getToken({ req });
  const { walletId, addresses } = await req.json();

  if (!walletId || !addresses) {
    return Response.json(
      { messge: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const addresses = await prisma.address.createMany()
    // const blockchain = await prisma.address.findFirst({
    //   where: {
    //     chainId: {
    //       equals: blockchainId,
    //     },
    //   },
    // });
    // const wallet = await prisma.wallet.create({
    //   data: {
    //     name,
    //     userId: token?.id as string,
    //     blockchainId: (blockchain?.id as string) ?? blockchainId,
    //     passphrase: hashedPassphrase,
    //   },
    //   select: {
    //     name: true,
    //     userId: true,
    //     blockchainId: true,
    //   },
    // });
    return Response.json(addresses, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
