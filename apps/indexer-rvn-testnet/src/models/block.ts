import { Block as BlockParams } from "../types/block";

// export class Block<T extends BlockParams> {
//   constructor(public readonly BlockClass: new () => T) {}
// }

export class Block {
  hash: BlockParams["hash"];
  confirmations: BlockParams["confirmations"];
  size: BlockParams["size"];
  strippedsize: BlockParams["strippedsize"];
  weight: BlockParams["weight"];
  height: BlockParams["height"];
  version: BlockParams["version"];
  versionHex: BlockParams["versionHex"];
  merkleroot: BlockParams["merkleroot"];
//   tx: BlockParams["tx"];
  time: BlockParams["time"];
  mediantime: BlockParams["mediantime"];
  nonce: BlockParams["nonce"];
  bits: BlockParams["bits"];
  difficulty: BlockParams["difficulty"];
  chainwork: BlockParams["chainwork"];
  previousblockhash: BlockParams["previousblockhash"];
  nextblockhash: BlockParams["nextblockhash"];

  constructor(params: BlockParams) {
    this.hash = params.hash;
    this.confirmations = params.confirmations;
    this.size = params.size;
    this.strippedsize = params.strippedsize;
    this.weight = params.weight;
    this.height = params.height;
    this.version = params.version;
    this.versionHex = params.versionHex;
    this.merkleroot = params.merkleroot;
    // this.tx = params.tx;
    this.time = params.time;
    this.mediantime = params.mediantime;
    this.nonce = params.nonce;
    this.bits = params.bits;
    this.difficulty = params.difficulty;
    this.chainwork = params.chainwork;
    this.previousblockhash = params.previousblockhash;
    this.nextblockhash = params.nextblockhash;
  }
}
