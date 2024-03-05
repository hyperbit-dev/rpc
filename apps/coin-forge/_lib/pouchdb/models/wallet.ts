import { Address } from "@hyperbitjs/mnemonic";

export type PouchDbWalletDoc = {
  _id: string;
  _rev?: string;
  userId: string;
  chainId: string;
  name: string;
  data:
    | string
    | {
        passphrase?: string;
        mnemonic: string;
        externalAddresses: Address[];
        changeAddresses: Address[];
      };
};

export type PoubDbWallet = {
  id: string;
  key: string;
  doc: PouchDbWalletDoc;
  value: {
    rev: string;
  };
};
