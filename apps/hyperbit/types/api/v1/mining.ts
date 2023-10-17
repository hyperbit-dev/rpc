export type GetMiningInfoResponse = {
  blocks: number;
  currentblockweight: number;
  currentblocktx: number;
  difficulty: number;
  networkhashps: number;
  hashespersec: number;
  pooledtx: number;
  chain: string;
  warnings: string;
};
