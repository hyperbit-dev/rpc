import { Vin as VinParams } from "../types/vin";

// export class Vin<T extends VinParams> {
//   constructor(public readonly VinClass: new () => T) {}
// }

export class Vin {
  coinbase?: string;
  sequence: number;
  txid?: string;
  vout?: number;
  scriptSig?: any;
  value?: number;
  valueSat?: number;
  address?: string;

  constructor(params: VinParams) {
    this.coinbase = params.coinbase;
    this.sequence = params.sequence;
    this.txid = params.txid;
    this.vout = params.vout;
    this.scriptSig = params.scriptSig;
    this.value = params.value;
    this.valueSat = params.valueSat;
    this.address = params.address;
  }
}
