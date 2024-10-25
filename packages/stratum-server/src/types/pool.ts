import tls from "tls";
import { StratumClient } from "../stratum";
import { Daemon } from "./";
import { Banning } from "./stratum";
import { CoinConfig } from "../algorithms/types";

export type Config = {
  address: string;
  api?: any; // object|function
  banning?: Banning;
  blockRefreshInterval: number;
  coin: ConfigCoin;
  connectionTimeout: number;
  daemons: Daemon[];
  feePercent: number;
  jobRebroadcastTimeout: number;
  meowpow_validator?: string;
  meowpow_wrapper_host?: string;
  meowpow_wrapper_port?: number;
  kawpow_validator?: string;
  kawpow_wrapper_host?: string;
  kawpow_wrapper_port?: number;
  p2p: P2P;
  ports: Record<string, Port>;
  rewardRecipients: Record<string, number>; // address: percentage
  tcpProxyProtocol: boolean;
  testnet?: boolean;
};

export type Port = {
  solo?: boolean;
  diff: number;
  tls?: tls.TLSSocket;
  varDiff: {
    maxDiff: number;
    maxJump: number;
    minDiff: number;
    retargetTime: number;
    targetTime: number;
    variancePercent: number;
  };
};

export type ConfigCoin = CoinConfig & {
  chainId: string;
  algorithm: string; // kawpow
  name: string; // ravencoin
  peerMagic?: string;
  peerMagicTestnet?: string;
  reward: string; // 'POS' | 'POW'
  symbol: string; // RVN
  blockTime?: number;
  blockChange?: number;
  explorerGetBlock?: any;
  explorerGetBlockJSON?: string;
  explorerGetTX?: boolean;
};

export type Recipient = {
  address: string;
  percent: number;
};

type InitStats = {
  connections: number;
  difficulty: number;
  networkHashRate: number;
  stratumPorts?: number[];
};

type P2P = {
  enabled?: boolean;
  host: string;
  port: number;
  disableTransactions?: boolean;
};

export interface PoolOptions extends Config {
  initStats: InitStats;
  hasSubmitMethod: boolean;
  poolAddressScript: any;
  protocolVersion: number;
  recipients: Recipient[];
}

export type RelinquishMinersStratumClient = {
  subId: string;
  client: StratumClient;
};

export type PoolOnSubmit = {
  workerName: string;
  jobId: string;
  extraNonce2: string;
  nTime: string;
  nOnce: string;
};
