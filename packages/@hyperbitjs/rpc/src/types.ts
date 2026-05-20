import type { AxiosRequestConfig } from 'axios';

export type RpcParams = unknown[] | Record<string, unknown>;

export type RpcRequestConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>;

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'none';

export type Logger = {
  debug(message: string, data?: unknown): void;
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, data?: unknown): void;
};

export type Config = {
  url: string;
  username?: string;
  password?: string;
  auth?: {
    username: string;
    password: string;
  };
  httpOptions?: RpcRequestConfig;
  headers?: Record<string, string>;
  /** Timeout in milliseconds. Default: 30000 */
  timeout?: number;
  /** Number of retry attempts for failed requests. Default: 0 */
  retries?: number;
  /** Delay in milliseconds between retries. Default: 1000 */
  retryDelay?: number;
  /** Enable request/response logging. Default: 'none' */
  logLevel?: LogLevel;
  /** Custom logger function */
  logger?: Logger;
};

export type Options = RpcRequestConfig & {
  auth?: {
    username: string;
    password: string;
  };
};

export type RpcError = {
  code: number;
  data?: unknown;
  message: string;
  name: string;
  status: number;
  type?: 'RpcError' | 'ServerUnreachable' | 'ValidationError';
  description?: string;
  originalError?: unknown;
};

export type EnvClientConfig = Omit<Config, 'url'> & {
  url?: string;
};

export type RpcRequestPayload = {
  jsonrpc: '2.0';
  id: string;
  method: string;
  params: RpcParams;
};

export type RpcBatchRequestPayload = Array<Omit<RpcRequestPayload, 'jsonrpc'> & { jsonrpc: '2.0' }>;

export type RpcResponse<TResult = unknown> = {
  jsonrpc?: '2.0';
  id?: string | number | null;
  result?: TResult;
  error?: {
    code?: number;
    message?: string;
    data?: unknown;
  };
};

export type RpcBatchResponse<TResult = unknown> = Array<RpcResponse<TResult> | RpcError>;

export type RpcResult<TResult = unknown> = TResult | RpcError;

export type BatchRequest = {
  method: string;
  params?: unknown;
};
