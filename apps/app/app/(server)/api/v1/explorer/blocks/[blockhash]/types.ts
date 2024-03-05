export type ApiBlock = {
  hash: string;
  confirmations: number;
  strippedsize: number;
  size: number;
  weight: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  tx: [
    {
      txid: string;
      hash: string;
      version: number;
      size: number;
      vsize: number;
      locktime: number;
      vin: [
        {
          coinbase: string;
          sequence: number;
        },
      ];
      vout: [
        {
          value: number;
          n: number;
          scriptPubKey: {
            asm: string;
            hex: string;
            reqSigs: number;
            type: string;
            addresses: string[];
          };
        },
        {
          value: number;
          n: number;
          scriptPubKey: {
            asm: string;
            hex: string;
            type: string;
          };
        },
      ];
      hex: string;
    },
  ];
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  headerhash: string;
  mixhash: string;
  nonce64: number;
  previousblockhash: string;
  nextblockhash: string;
  kb: number;
  output: number;
};
