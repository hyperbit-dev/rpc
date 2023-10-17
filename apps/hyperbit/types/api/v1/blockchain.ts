export type GetBlockchainInfoResponse = {
  chain: string;
  blocks: number;
  headers: number;
  bestblockhash: string;
  difficulty: number;
  difficulty_algorithm: string;
  mediantime: number;
  verificationprogress: number;
  chainwork: string;
  size_on_disk: number;
  pruned: boolean;
  pruneheight: number;
  automatic_pruning: boolean;
  prune_target_size: number;
  softforks: GetBlockchainInfoResponseSoftFork[];
  bip9_softforks: GetBlockchainInfoResponseBip9SoftFork;
  warnings: string;
};

type GetBlockchainInfoResponseSoftFork = {
  id: string;
  version: number;
  reject: {
    status: boolean;
  };
};

type GetBlockchainInfoResponseBip9SoftFork = {
  [key: string]: {
    status: string;
    bit?: number;
    startTime: number;
    timeout: number;
    since: number;
    statistics?: {
      period: number;
      threshold: number;
      elapsed: number;
      count: number;
      possible: number;
    };
  };
};

export type GetChainTxStatsResponse = {
  time: number;
  txcount: number;
  window_block_count: number;
  window_tx_count: number;
  window_interval: number;
  txrate: number;
};
