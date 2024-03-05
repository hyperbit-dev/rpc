export type ApiRawTransaction = {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  locktime: number;
  vin: ApiVin[];
  vout: ApiVout[];
  hex: string;
  blockhash?: string;
  height?: number;
  confirmations?: number;
  time?: number;
  blocktime?: number;
};

export type ApiVin = {
  txid: string;
  vout: number;
  scriptSig: {
    asm: string;
    hex: string;
  };
  sequence: number;
  address?: string[];
  value?: number;
  coinbase?: string;
};

export type ApiVout = {
  address?: string;
  value: number;
  n: number;
  scriptPubKey: {
    asm: string;
    hex: string;
    reqSigs?: number;
    type: string;
    addresses?: string[];
    asset?: ApiVoutAsset;
  };
  valueSat: number;
};

type ApiVoutAsset = {
  name: string;
  amount: number;
};
