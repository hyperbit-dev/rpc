import { Prisma } from "@hyperbit-private/database";
import { Address } from "@hyperbitjs/mnemonic";

export type WebWallet = Omit<
  Prisma.WalletGetPayload<{}>,
  "id" | "blockchainId" | "createdAt" | "updatedAt" | "deletedAt"
> & {
  _id: string;
  _rev?: string;
  blockchainId?: string;
  chainId: string;
  mnemonic: string;
  externalAddresses: Address[];
  changeAddresses: Address[];
};

export type PoubDbWallet = {
  id: string;
  key: string;
  doc: WebWallet;
  value: {
    rev: string;
  };
};
