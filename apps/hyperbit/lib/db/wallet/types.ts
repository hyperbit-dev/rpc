import { GenerateAddressSet } from "@hyperbitjs/mnemonic";
import { Prisma } from "@prisma/client";

export type DbWallet = Prisma.WalletCreateInput;

export type Wallet = {
  dbWallet: DbWallet;
  pouchDbWallet: PouchDbWallet;
};

export type PouchDbWallet = {
  accounts: Map<number, PouchDbAccount[]>;
};

export type PouchDbAccount = Record<number, PouchDbAddress[]>;

export type PouchDbAddress = {};
