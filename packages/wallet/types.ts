import { MainNet, TestNet, RegTest, SimNet } from "@hyperbitjs/chains";
import { Address, Language } from "@hyperbitjs/mnemonic";

export type Options = {
  id?: string; // uuidv4
  externalId?: string; // database id
  label: string;
  mnemonic?: string;
  passphrase?: string;
  network?: MainNet | TestNet | RegTest | SimNet;
  language?: Language;
  database: string;
  type?: "import" | "create";
};

export type Accounts = Record<string | number, Addresses>;

export type Addresses = {
  external: Map<string, Address>;
  change: Map<string, Address>;
};

export type AddressJSON = Omit<Address, "privateKey" | "wif"> & {
  privateKey?: string;
  wif?: string;
};

export type AccountsJSON = Record<
  string | number,
  Omit<Addresses, "external" | "change"> & {
    external: Record<string, AddressJSON>;
    change: Record<string, AddressJSON>;
  }
>;
