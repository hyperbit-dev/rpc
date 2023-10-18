import { Transaction as TransactionParams } from "../types/transaction";

// export class Transaction<T extends TransactionParams> {
//   constructor(public readonly TransactionClass: new () => T) {}
// }

export class Transaction {
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

  constructor(params: TransactionParams) {
    this.hash = params.hash;
    this.version = params.version;
    this.size = params.size;
    this.vsize = params.vsize;
    this.locktime = params.locktime;
    this.vin = JSON.stringify(params.vin);
    this.vout = JSON.stringify(params.vout);
    this.hex = params.hex;
    this.blockhash = params.blockhash;
    this.height = params.height;
    this.confirmations = params.confirmations;
    this.time = params.time;
  }
}
