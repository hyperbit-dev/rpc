import { Network } from "@hyperbitjs/chains";
import { Address, Language } from "@hyperbitjs/mnemonic";

export type Options = {
  id?: string; // uuidv4
  externalId?: string; // database id
  mnemonic?: string;
  passphrase?: string;
  network: Network;
  language?: Language;
  database: string;
  encryptionKey: string;
};

export type Account = {
  external: Address[];
  change: Address[];
};

export type Accounts = Record<string | number, Account>;

export type AddressJSON = Omit<Address, "privateKey" | "wif"> & {
  privateKey?: string;
  wif?: string;
};

export type AccountsJSON = Record<
  string | number,
  Omit<Accounts, "external" | "change"> & {
    external: Record<string, AddressJSON>;
    change: Record<string, AddressJSON>;
  }
>;

export type PouchDBWallet = {
  _id: string;
  rev: string;
  externalId: string;
  mnemonic: string;
  accounts: AccountsJSON;
}