export type Transaction = {
  hash: string;
  version: number;
  size: number;
  vsize: number;
  locktime: number;
  vin: any;
  vout: any;
  hex: string;
  blockhash?: string;
  height?: number;
  confirmations?: number;
  time?: number;
};
