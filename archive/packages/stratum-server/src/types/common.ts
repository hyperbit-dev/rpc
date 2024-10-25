export type RpcData = {
  bits: string;
  coinbasevalue: number;
  curtime: number;
  default_witness_commitment?: string;
  height: number;
  previousblockhash: string;
  reward: number;
  rewardFees: number;
  rewardToPool: number;
  target: string;
  transactions: any[];
  [x: string]: any;
};
