import { MainNet, TestNet } from "@hyperbitjs/chains";
import { Address } from "@hyperbitjs/mnemonic";

export type Network = MainNet | TestNet;

export type WalletOptions = {
  network: Network;
  name: string;
  passphrase?: string | undefined;
};

export type PouchDbWalletAccount = {
  name?: string;
  addresses: {
    external: PouchDbWalletAddress[];
    change: PouchDbWalletAddress[];
  };
};

export type PouchDbWalletAccounts = Record<string, PouchDbWalletAccount>;

export type PouchDbWallet = {
  _id: string;
  name?: string;
  words?: string;
  passphrase?: string;
  networkId?: string;
  language?: string;
  accounts: PouchDbWalletAccounts;
};

export type PouchDbWalletAddress = Address & {
  _id?: string;
  label?: string;
};
