import { Vout as VoutParams } from "../types/vout";

// export class Vout<T extends VoutParams> {
//   constructor(public readonly VoutClass: new () => T) {}
// }

export class Vout {
  n: number;
  scriptPubKey: any;
  valueSat: number;

  constructor(params: VoutParams) {
    this.n = params.n;
    this.scriptPubKey = params.scriptPubKey;
    this.valueSat = params.valueSat;
  }
}
