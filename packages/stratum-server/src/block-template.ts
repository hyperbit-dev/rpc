import BigNumber from "bignumber.js";
import { Buffer } from "node:buffer";
import { SHA3 } from "sha3";
import { algorithms } from "./algorithms";
import { createGeneration, getFees } from "./transactions";
import { getRoot } from "./merkle-tree";
import { JobParams, PoolOptions, RpcData } from "./types";
import {
  packUInt32BE,
  reverseBuffer,
  sha256d,
  varIntBuffer,
} from "@hyperbit-private/utils";
import { Algorithm } from "./algorithms/types";

export class BlockTemplate {
  private _options: PoolOptions;
  private _algorithm: Algorithm;

  curTime: number = (Date.now() / 1000) | 0;
  difficulty: number;
  genTx?: string;
  genTxHash: string;
  jobId: string;
  merkleRoot!: string;
  merkleRootReversed!: string;
  nTime: string;
  prevHashReversed: string;
  rewardFees: number;
  rpcData: RpcData;
  submits: string[] = [];
  target_hex: string;
  target: BigNumber;
  txCount!: number;
  epochLength: number = 7500;

  // Job Params
  jobParams?: JobParams;
  localTarget!: string;
  seedhash!: string;
  epoch_number!: number;
  header_hash!: string;

  constructor(jobId: string, rpcData: RpcData, options: PoolOptions) {
    this._options = options;
    this._algorithm = algorithms[this._options.coin.algorithm] as Algorithm;
    this.epochLength =
      this._options.coin.algorithm === "evrprogpow" ? 12000 : this.epochLength;

    this.jobId = jobId;
    this.rpcData = rpcData;
    this.target = new BigNumber(this.rpcData.target, 16);
    this.target_hex = this.rpcData.target;
    this.difficulty = parseFloat(
      (this._algorithm.diff / this.target.toNumber()).toFixed(9),
    );

    this.nTime = packUInt32BE(this.rpcData.curtime).toString("hex");

    const blockReward = this.rpcData.coinbasevalue;
    const fees: number[] = [];

    if (Array.isArray(this.rpcData.transactions)) {
      this.rpcData.transactions.forEach((value: any) => {
        fees.push(value);
      });
    }

    this.rewardFees = getFees(fees);

    this.rpcData.rewardFees = this.rewardFees;

    if (typeof this.genTx === "undefined") {
      const createTx = createGeneration(
        this.rpcData,
        blockReward,
        this.rewardFees,
        this._options.recipients,
        this._options.address,
      );

      // @ts-ignore
      this.genTx = createTx.txHex.toString("hex");
      this.genTxHash = createTx.txHash;
    } else {
      // @ts-ignore
      this.genTxHash = this.genTx.toString("hex");
    }

    this.prevHashReversed = reverseBuffer(
      Buffer.from(this.rpcData.previousblockhash, "hex"),
    ).toString("hex");
  }

  async init() {
    const result = await getRoot(this.rpcData, this.genTxHash);
    this.merkleRoot = result;
    this.txCount = this.rpcData.transactions.length + 1; // add total txs and new coinbase

    this.merkleRootReversed = reverseBuffer(
      Buffer.from(this.merkleRoot, "hex"),
    ).toString("hex");

    const powLimit = this._algorithm.diff;
    const adjPow = powLimit / this.difficulty;

    let zeroPad = "";
    if (64 - adjPow.toString(16).length !== 0) {
      zeroPad = "0";
      zeroPad = zeroPad.repeat(64 - adjPow.toString(16).length);
    }

    this.localTarget = (zeroPad + adjPow.toString(16)).substr(0, 64);
    let d = new SHA3.SHA3Hash(256);
    let seedhash_buf = Buffer.alloc(32);
    this.seedhash = seedhash_buf.toString("hex");

    this.epoch_number = Math.floor(this.rpcData.height / this.epochLength);

    for (let i = 0; i < this.epoch_number; i++) {
      d = new SHA3.SHA3Hash(256);
      d.update(seedhash_buf);
      seedhash_buf = d.digest();
      this.seedhash = d.digest("hex");
    }

    const header_hash = this.serializeHeader();
    this.header_hash = reverseBuffer(sha256d(header_hash)).toString("hex");

    let override_target = 0;
    if (override_target !== 0 && adjPow > override_target) {
      zeroPad = "0";
      zeroPad = zeroPad.repeat(64 - override_target.toString(16).length);
      this.localTarget = (zeroPad + override_target.toString(16)).substr(0, 64);
    }
  }

  serializeHeader(): Buffer {
    let header = Buffer.alloc(80);
    let position = 0;
    header.write(
      packUInt32BE(this.rpcData.height).toString("hex"),
      position,
      4,
      "hex",
    );

    header.write(this.rpcData.bits, (position += 4), 4, "hex");
    header.write(this.nTime, (position += 4), 4, "hex");
    header.write(this.merkleRoot, (position += 4), 32, "hex");
    header.write(this.rpcData.previousblockhash, (position += 32), 32, "hex");
    // @ts-ignore TODO: Identify which offset is intended
    header.writeUInt32BE(this.rpcData.version, position + 32, 4);
    header = reverseBuffer(header);
    return header;
  }

  serializeBlock(
    // @ts-ignore
    header_hash: Buffer,
    nonce: Buffer,
    mixhash: Buffer,
  ): Buffer {
    let header = this.serializeHeader();
    let foo = Buffer.alloc(40);
    foo.write(reverseBuffer(nonce).toString("hex"), 0, 8, "hex");
    foo.write(reverseBuffer(mixhash).toString("hex"), 8, 32, "hex");
    let buf = Buffer.concat([
      header,
      foo,
      varIntBuffer(this.rpcData.transactions.length + 1),
      Buffer.from(this.genTx!, "hex"),
    ]);
    if (this.rpcData.transactions.length > 0) {
      this.rpcData.transactions.forEach((value: any) => {
        const tmpBuf = Buffer.concat([buf, Buffer.from(value.data, "hex")]);
        buf = tmpBuf;
      });
    }
    return buf;
  }

  registerSubmit(header: string, nonce: string): boolean {
    var submission = header + nonce;
    if (this.submits.indexOf(submission) === -1) {
      this.submits.push(submission);
      return true;
    }
    return false;
  }

  getJobParams(): JobParams {
    if (!this.jobParams) {
      this.jobParams = [
        this.jobId,
        this.header_hash,
        this.seedhash,
        this.localTarget,
        true,
        this.rpcData.height,
        this.rpcData.bits,
      ];
    }
    return this.jobParams;
  }
}
