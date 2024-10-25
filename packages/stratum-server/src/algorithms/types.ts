import { Buffer } from "node:buffer";

export type Algorithm = {
    multiplier?: number;
    diff: number;
    maxDiff?: number;
    shift?: number;
    bits?: Buffer;
    nonTruncatedDiff?: Buffer;
    hash: (_coinConfig: CoinConfig) => any;
    epochLength?: number;
  };
  
  export type CoinConfig = {
    nValue?: number;
    rValue?: number;
    chainStartTime?: number;
    nMin?: number;
    nMax?: number;
    timeTable?: Record<string, number>;
    normalHashing?: boolean;
  }
  