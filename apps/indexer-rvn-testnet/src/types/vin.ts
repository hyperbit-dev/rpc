export type Vin = {
  coinbase?: string;
  sequence: number;
  txid?: string;
  vout?: number;
  scriptSig?: any;
  value?: number;
  valueSat?: number;
  address?: string;
};
