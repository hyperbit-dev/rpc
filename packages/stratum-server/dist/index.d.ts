import { EventEmitter } from "node:events";
import { EventEmitter as EventEmitter$1 } from "events";
import { Config as Config$1 } from "@hyperbitjs/rpc";
import BigNumber from "bignumber.js";
import { Buffer } from "node:buffer";
import tls$1 from "tls";
import net from "node:net";
import tls from "node:tls";
import net$1 from "net";
import http from "http";

type RpcData$1 = {
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

type Daemon$1 = Omit<Config$1, "url"> & {
  url?: string;
  host?: string;
  port?: number | string;
};
type Kawpowhash = {
  digest: string;
  result: string;
  mix_hash: string;
  meets_target: boolean;
};
type Progpowhash = {
  digest: string;
  result: string;
  mix_hash: string;
  meets_target: boolean;
};

interface StratumError extends http.ServerResponse {
  code: string;
  message: string;
}

type Options = {
  coin: any;
  subscriptionId: string;
  authorizeFn: AuthorizeFn;
  socket: tls.TLSSocket | net.Socket;
  banning?: Banning;
  connectionTimeout: number;
  tcpProxyProtocol: boolean;
};
type Shares = {
  valid: number;
  invalid: number;
};
type Username = string;
type Password = string;
type HandleAuthorize = {
  id: number;
  params: [Username, Password];
};
declare class StratumClient extends EventEmitter {
  authorized: boolean;
  difficulty: number;
  extraNonce1: string | null;
  lastActivity: number;
  private _options;
  private _algorithm;
  pendingDifficulty: number | null;
  previousDifficulty: number | null;
  remoteAddress: string;
  requestedSubscriptionBeforeAuth: boolean;
  socket: tls.TLSSocket | net.Socket;
  shares: Shares;
  version: string | number | null;
  workerName: string;
  workerPass: string;
  constructor(options: Options);
  init(): void;
  considerBan(shareValid: boolean): boolean;
  handleMessage(message: any): void;
  handleEthSubmitHashrate(message: {
    id: number;
    method: "eth_submitHashrate" | "mining.eth_submitHashrate";
    params: [string, string];
    jsonrpc: "2.0";
  }): void;
  handleHashrate(message: any): void;
  handleSubscribe(message: any): void;
  getSafeString(s: number | string): string;
  getSafeWorkerString(raw: string): string;
  handleAuthorize(message: HandleAuthorize): void;
  handleSubmit(message: ClientHandleSubmit): void;
  sendJson(...params: any): void;
  setupSocket(): void;
  getLabel(): string;
  enqueueNextDifficulty(requestedNewDifficulty: number): boolean;
  sendDifficulty(difficulty: number): boolean;
  sendMiningJob(jobParams: JobParams): void;
  manuallyAuthClient(username: string, password: string): void;
  manuallySetValues(otherClient: StratumClient): void;
}

declare class SubscriptionCounter {
  count: number;
  padding: string;
  next(): string;
}

declare class StratumServer extends EventEmitter$1 {
  private _bannedMS;
  private _stratumClients;
  private _subscriptionCounter;
  private _rebroadcastTimeout?;
  private _bannedIPs;
  private _authorizeFn;
  private _options;
  constructor(options: PoolOptions, authorizeFn: AuthorizeFn);
  init(): void;
  checkBan(client: StratumClient): void;
  handleNewClient(socket: tls$1.TLSSocket | net$1.Socket): string;
  removeStratumClientBySubId(subscriptionId: string): void;
  addBannedIP(ipAddress: string): void;
  broadcastMiningJobs(jobParams: JobParams): void;
  getStratumClients(): Record<string, StratumClient>;
  manuallyAddStratumClient(client: StratumClient): void;
}

type AuthorizeFn = (
  remoteAddress: string | undefined, // ip address
  localPort: number | undefined,
  address: string, // workerName xxxxxxxxx.x
  workerPassword: string,
  extraNonce1: string | null,
  version: number | string | null,
  cb: AuthorizeFnCallback,
) => void;
type AuthorizeFnCallback = ({
  error,
  authorized,
  disconnect,
}: {
  error: any;
  authorized: boolean;
  disconnect: boolean;
}) => void;
type Banning = {
  checkThreshold: number;
  enabled: boolean;
  invalidPercent: number;
  purgeInterval: number;
  time: number;
};
type JobParams = [
  number | string,
  string,
  string,
  string,
  boolean,
  number,
  // rpcData heigth
  number | string,
];
type ClientHandleSubmit = {
  id: number;
  jsonrpc?: "2.0";
  method: string;
  params: string[];
  worder: string;
};

type Algorithm = {
  multiplier?: number;
  diff: number;
  maxDiff?: number;
  shift?: number;
  bits?: Buffer;
  nonTruncatedDiff?: Buffer;
  hash: (_coinConfig: CoinConfig) => any;
  epochLength?: number;
};
type CoinConfig = {
  nValue?: number;
  rValue?: number;
  chainStartTime?: number;
  nMin?: number;
  nMax?: number;
  timeTable?: Record<string, number>;
  normalHashing?: boolean;
};

type Config = {
  address: string;
  api?: any;
  banning?: Banning;
  blockRefreshInterval: number;
  coin: ConfigCoin;
  connectionTimeout: number;
  daemons: Daemon$1[];
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
  rewardRecipients: Record<string, number>;
  tcpProxyProtocol: boolean;
  testnet?: boolean;
};
type Port = {
  solo?: boolean;
  diff: number;
  tls?: tls$1.TLSSocket;
  varDiff: {
    maxDiff: number;
    maxJump: number;
    minDiff: number;
    retargetTime: number;
    targetTime: number;
    variancePercent: number;
  };
};
type ConfigCoin = CoinConfig & {
  chainId: string;
  algorithm: string;
  name: string;
  peerMagic?: string;
  peerMagicTestnet?: string;
  reward: string;
  symbol: string;
  blockTime?: number;
  blockChange?: number;
  explorerGetBlock?: any;
  explorerGetBlockJSON?: string;
  explorerGetTX?: boolean;
};
type Recipient = {
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
interface PoolOptions extends Config {
  initStats: InitStats;
  hasSubmitMethod: boolean;
  poolAddressScript: any;
  protocolVersion: number;
  recipients: Recipient[];
}
type RelinquishMinersStratumClient = {
  subId: string;
  client: StratumClient;
};
type PoolOnSubmit = {
  workerName: string;
  jobId: string;
  extraNonce2: string;
  nTime: string;
  nOnce: string;
};

type CreateGeneration = {
  txHex: string;
  txHash: string;
};

type VarDiffOptions = {
  targetTime: number;
  variancePercent: number;
  retargetTime: number;
  maxDiff: number;
  minDiff: number;
  x2mode?: boolean;
};

type Daemon = Daemon$1 & {
  index?: number;
};
declare class DaemonInterface extends EventEmitter$1 {
  private _daemons;
  private _logger;
  constructor(daemons: Daemon[], logger: any);
  init(): void;
  isOnline(callback: (_online: boolean) => void): void;
  performHttpRequest(instance: Daemon, jsonData: string, callback: any): void;
  batchCmd(cmdArray: any[], callback: any): void;
  cmd(
    method: string,
    params: any,
    callback: any,
    _streamResults?: any,
    _returnRawData?: any,
  ): void;
  logger(severity: string, message: string): any;
}

declare class BlockTemplate {
  private _options;
  private _algorithm;
  curTime: number;
  difficulty: number;
  genTx?: string;
  genTxHash: string;
  jobId: string;
  merkleRoot: string;
  merkleRootReversed: string;
  nTime: string;
  prevHashReversed: string;
  rewardFees: number;
  rpcData: RpcData$1;
  submits: string[];
  target_hex: string;
  target: BigNumber;
  txCount: number;
  epochLength: number;
  jobParams?: JobParams;
  localTarget: string;
  seedhash: string;
  epoch_number: number;
  header_hash: string;
  constructor(jobId: string, rpcData: RpcData$1, options: PoolOptions);
  init(): Promise<void>;
  serializeHeader(): Buffer;
  serializeBlock(header_hash: Buffer, nonce: Buffer, mixhash: Buffer): Buffer;
  registerSubmit(header: string, nonce: string): boolean;
  getJobParams(): JobParams;
}

declare class ExtraNonceCounter {
  next(): string;
}

declare class JobCounter {
  counter: number;
  next(): string;
  cur(): string;
}

declare class JobManager extends EventEmitter$1 {
  private _options;
  private _algorithm;
  currentJob?: BlockTemplate;
  daemon?: DaemonInterface;
  extraNonceCounter: ExtraNonceCounter;
  hashDigest: string;
  jobCounter: JobCounter;
  shareMultiplier: number;
  validJobs: Record<string, BlockTemplate>;
  constructor(options: PoolOptions);
  emitLog(text: string): void;
  emitWarningLog(text: string): void;
  emitErrorLog(text: string): void;
  emitSpecialLog(text: string): void;
  setupJobDaemonInterface(finishedCallback: any): void;
  isHexString(s: string): boolean;
  isHex(c: string): boolean;
  updateCurrentJob(rpcData: RpcData$1): Promise<void>;
  processTemplate(rpcData: RpcData$1): Promise<boolean>;
  processShare(
    miner_given_jobId: string,
    _previousDifficulty: number,
    difficulty: number,
    miner_given_nonce: string,
    ipAddress: string,
    port: number,
    workerName: string,
    miner_given_header: string,
    miner_given_mixhash: string,
    extraNonce1: string,
    callback_parent: any,
  ): void;
}

declare class RingBuffer {
  data: number[];
  cursor: number;
  isFull: boolean;
  maxSize: number;
  constructor(maxSize: number);
  append(x: number): void;
  avg(): number;
  size(): number;
  clear(): void;
}
declare class VarDiff extends EventEmitter$1 {
  bufferSize: number;
  tMin: number;
  tMax: number;
  port: number | string;
  varDiffOptions: VarDiffOptions;
  constructor(port: number | string, varDiffOptions: VarDiffOptions);
  manageClient(client: StratumClient): void;
}

declare class Pool extends EventEmitter {
  private _options;
  private _algorithm;
  private _authorizeFn;
  blockPollingIntervalId?: NodeJS.Timer;
  daemon?: DaemonInterface;
  progpow_wrapper: null;
  jobManagerLastSubmitBlockHex?: string;
  jobManager?: JobManager;
  stratumServer?: StratumServer;
  varDiff: Record<string, VarDiff>;
  constructor(options: Config, authorizeFn: AuthorizeFn);
  parseOptions(options: Config): PoolOptions;
  emitLog(text: string): void;
  emitWarningLog(text: string): void;
  emitErrorLog(text: string): void;
  emitSpecialLog(text: string): void;
  start(): Promise<void>;
  getFirstJob(finishedCallback: any): void;
  outputPoolInfo(): void;
  onBlockchainSynced(syncedCallback: any): void;
  setupApi(): void;
  setupVarDiff(): void;
  submitBlock(blockHex: string, callback: any): void;
  setupRecipients(): void;
  setupJobManager(): void;
  setupDaemonInterface(): Promise<void>;
  detectCoinData(): Promise<void>;
  startStratumServer(finishedCallback: any): void;
  setupBlockPolling(): void;
  getBlockTemplate(callback: any): void;
  checkBlockAccepted(blockHash: string, callback: any): void;
  processBlockNotify(blockHash: string, sourceTrigger: string): void;
  relinquishMiners(filterFn: any, resultCback: any): void;
  attachMiners(miners: StratumClient[]): void;
  getStratumServer(): StratumServer | undefined;
  setVarDiff(port: string, varDiffConfig: VarDiffOptions): void;
}

declare const algorithms: Record<string, Algorithm>;

type Transaction = {
  txid: string;
  hash: string;
};
type RpcData = {
  transactions: Transaction[];
};
declare function getRoot(
  rpcData: RpcData,
  generateTxRaw: string,
): Promise<string>;

type InvCodes = {
  error: number;
  tx: number;
  block: number;
};
type Commands = {
  version: Buffer;
  inv: Buffer;
  verack: Buffer;
  addr: Buffer;
  getblocks: Buffer;
};
declare class Peer extends EventEmitter {
  private _options;
  client?: net.Socket;
  magic: Buffer;
  magicInt: number;
  verack: boolean;
  validConnectionConfig: boolean;
  invCodes: InvCodes;
  networkServices: Buffer;
  emptyNetAddress: Buffer;
  userAgent: Buffer;
  blockStartHeight: Buffer;
  relayTransactions: Buffer;
  commands: Commands;
  constructor(options: PoolOptions);
  init(): void;
  connect(): void;
  sendVersion(): void;
  sendMessage(command: Buffer, payload: Buffer): void;
  setupMessageParser(client: net.Socket): void;
  handleMessage(command: string, payload: Buffer): void;
  handleInv(payload: Buffer): void;
  commandStringBuffer(s: string): Buffer;
  fixedLenStringBuffer(s: string, len: number): Buffer;
  readFlowingBytes(
    stream: net.Socket,
    amount: number,
    preRead: Buffer | any,
    callback: any,
  ): void;
}

declare function createGeneration(
  rpcData: RpcData$1,
  blockReward: number,
  feeReward: number,
  recipients: any[],
  poolAddress: string,
): CreateGeneration;
declare function getFees(feeArray: any[]): number;

declare function createPool(
  poolOptions: Config,
  authorizeFn: AuthorizeFn,
): Pool;

export {
  type AuthorizeFn,
  type AuthorizeFnCallback,
  type Banning,
  BlockTemplate,
  type ClientHandleSubmit,
  type Config,
  type ConfigCoin,
  type CreateGeneration,
  type Daemon$1 as Daemon,
  DaemonInterface,
  ExtraNonceCounter,
  JobCounter,
  JobManager,
  type JobParams,
  type Kawpowhash,
  Peer,
  Pool,
  type PoolOnSubmit,
  type PoolOptions,
  type Port,
  type Progpowhash,
  type Recipient,
  type RelinquishMinersStratumClient,
  RingBuffer,
  type RpcData$1 as RpcData,
  StratumClient,
  type StratumError,
  StratumServer,
  SubscriptionCounter,
  VarDiff,
  type VarDiffOptions,
  algorithms,
  createGeneration,
  createPool,
  getFees,
  getRoot,
};
