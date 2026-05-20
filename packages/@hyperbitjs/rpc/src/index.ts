import axios, { AxiosError, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import {
  BatchRequest,
  Config,
  EnvClientConfig,
  Logger,
  LogLevel,
  Options,
  RpcBatchRequestPayload,
  RpcBatchResponse,
  RpcError,
  RpcRequestPayload,
  RpcResponse,
  RpcResult,
} from './types';

export * from './types';

const HTTP_SUCCESS_RANGE = { min: 200, max: 399 };
const DEFAULT_TIMEOUT_MS = 30000;
const DEFAULT_RETRY_DELAY_MS = 1000;
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);

const SYNTAX_ERROR_MESSAGE =
  'Syntax error. Initialize client with { url } or use createClientFromEnv() with RPC_URL configured.';

const UNREACHABLE_DESCRIPTION =
  'Could not communicate with the RPC node. Verify the URL, credentials, and network connectivity.';

const runtimeConsole = globalThis.console;

type EnvLike = Record<string, string | undefined>;

/**
 * Default logger implementation.
 */
const createDefaultLogger = (level: LogLevel): Logger => ({
  debug: (message, data) =>
    level === 'debug' && runtimeConsole.debug(`[RPC DEBUG] ${message}`, data),
  info: (message, data) =>
    ['debug', 'info'].includes(level) &&
    runtimeConsole.info(`[RPC INFO] ${message}`, data),
  warn: (message, data) =>
    ['debug', 'info', 'warn'].includes(level) &&
    runtimeConsole.warn(`[RPC WARN] ${message}`, data),
  error: (message, data) =>
    level !== 'none' && runtimeConsole.error(`[RPC ERROR] ${message}`, data),
});

const assertValidConfig = (config: Config): void => {
  if (!config || typeof config.url !== 'string' || !config.url.trim()) {
    throw new Error(SYNTAX_ERROR_MESSAGE);
  }
};

const getDefaultEnv = (): EnvLike => {
  const runtime = globalThis as { process?: { env?: EnvLike } };
  return runtime.process?.env ?? {};
};

const parseOptionalNumber = (value: string | undefined): number | undefined => {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

/**
 * JSON-RPC client for blockchain node communication.
 *
 * `request()` returns a safe union type (`result | RpcError`).
 * `requestOrThrow()` throws on any RPC or transport error.
 */
export class Client {
  private readonly url: string;
  private readonly options: Options;
  private readonly instance: AxiosInstance;
  private readonly headers: Record<string, string>;
  private readonly timeout: number;
  private readonly retries: number;
  private readonly retryDelay: number;
  private readonly logger: Logger;

  /**
   * Creates a new RPC client instance.
   */
  constructor(config: Config) {
    assertValidConfig(config);

    this.url = config.url;
    this.headers = config.headers ?? {};
    this.timeout = config.timeout ?? DEFAULT_TIMEOUT_MS;
    this.retries = config.retries ?? 0;
    this.retryDelay = config.retryDelay ?? DEFAULT_RETRY_DELAY_MS;
    this.logger = config.logger ?? createDefaultLogger(config.logLevel ?? 'none');

    this.instance = axios.create({
      validateStatus: (status) =>
        status >= HTTP_SUCCESS_RANGE.min && status < HTTP_SUCCESS_RANGE.max,
      timeout: this.timeout,
    });

    const auth = this.normalizeAuth(config);
    this.options = {
      ...(config.httpOptions ?? {}),
      ...(auth ? { auth } : {}),
    };
  }

  /**
   * Normalizes auth configuration from supported input formats.
   */
  private normalizeAuth(config: Config) {
    return (
      config.auth ??
      (config.username && config.password
        ? { username: config.username, password: config.password }
        : undefined)
    );
  }

  /**
   * Returns a serializable snapshot for diagnostics.
   * Sensitive values such as auth credentials are excluded.
   */
  toJSON(): {
    url: string;
    timeout: number;
    retries: number;
  } {
    return {
      url: this.url,
      timeout: this.timeout,
      retries: this.retries,
    };
  }

  /**
   * Type guard for narrowing unknown values to `RpcError`.
   */
  static isRpcError(value: unknown): value is RpcError {
    return (
      typeof value === 'object' &&
      value !== null &&
      'status' in value &&
      'code' in value &&
      'message' in value
    );
  }

  private createPayload(method: string, params: unknown = []): RpcRequestPayload {
    return {
      jsonrpc: '2.0',
      id: this.createRequestId(),
      method,
      params: params as RpcRequestPayload['params'],
    };
  }

  private createBatchPayload(requests: BatchRequest[]): RpcBatchRequestPayload {
    return requests.map((request) => ({
      jsonrpc: '2.0' as const,
      id: this.createRequestId(),
      method: request.method,
      params: (request.params ?? []) as RpcRequestPayload['params'],
    }));
  }

  /**
   * Generates request ID using `crypto.randomUUID` when available.
   */
  private createRequestId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  /**
   * Validates request inputs before transport.
   */
  private validateRequest(method: string): void {
    if (typeof method !== 'string' || method.trim().length === 0) {
      throw new Error('RPC method must be a non-empty string');
    }
  }

  /**
   * Returns true when an HTTP status should be retried.
   */
  private isRetryableStatus(status?: number): boolean {
    if (!status) {
      return true;
    }

    return RETRYABLE_STATUS_CODES.has(status);
  }

  /**
   * Sleeps for the specified duration in milliseconds.
   */
  private sleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  private toRpcError(error: unknown, payload: RpcRequestPayload): RpcError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<RpcResponse>;
      const isUnreachable =
        !axiosError.response ||
        axiosError.code === 'ECONNREFUSED' ||
        axiosError.code === 'ENOTFOUND' ||
        axiosError.code === 'ETIMEDOUT' ||
        axiosError.code === 'ECONNABORTED';

      if (isUnreachable) {
        return {
          code: 503,
          data: payload,
          message: 'Could not communicate with RPC node',
          name: axiosError.name,
          status: 503,
          type: 'ServerUnreachable',
          description: `${UNREACHABLE_DESCRIPTION} Current URL=${this.url}`,
          originalError: axiosError,
        };
      }

      return {
        code:
          axiosError.response?.data?.error?.code ??
          axiosError.response?.status ??
          500,
        data: axiosError.response?.data?.error?.data ?? payload,
        message:
          axiosError.response?.data?.error?.message ??
          axiosError.response?.statusText ??
          axiosError.message ??
          'Unknown request failure. Please review: rpc command, arguments and connection.',
        name: axiosError.name,
        status: axiosError.response?.status ?? 500,
        type: 'RpcError',
        description: axiosError.response?.statusText,
        originalError: axiosError,
      };
    }

    return {
      code: 500,
      data: payload,
      message:
        error instanceof Error
          ? error.message
          : 'Unknown request failure. Please review: rpc command, arguments and connection.',
      name: error instanceof Error ? error.name : 'Error',
      status: 500,
      type: 'RpcError',
      originalError: error,
    };
  }

  /**
   * Parses an RPC response into either typed result or `RpcError`.
   */
  private parseResponse<TResult>(
    data: RpcResponse<TResult> | unknown,
    status: number,
    payload: RpcRequestPayload,
  ): RpcResult<TResult> {
    if (typeof data !== 'object' || data === null) {
      return data as TResult;
    }

    const response = data as RpcResponse<TResult>;

    if (response.error) {
      return {
        code: response.error.code ?? status,
        data: response.error.data ?? payload,
        message: response.error.message ?? 'RPC request failed',
        name: 'RpcError',
        status,
        type: 'RpcError',
      };
    }

    if ('result' in response) {
      return (response.result ?? null) as TResult;
    }

    return response as TResult;
  }

  /**
   * Executes a single RPC request with retry support.
   */
  private async makeRequestWithRetry<TResult>(
    payload: RpcRequestPayload,
    config: RawAxiosRequestConfig,
  ): Promise<RpcResult<TResult>> {
    let lastError: unknown;

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        this.logger.debug(`RPC request attempt ${attempt + 1}`, {
          method: payload.method,
          id: payload.id,
        });

        const response = await this.instance.post<RpcResponse<TResult>>(
          this.url,
          payload,
          {
            ...this.options,
            ...config,
            headers: {
              ...(this.headers ?? {}),
              ...(config.headers ?? {}),
            },
          },
        );

        this.logger.debug('RPC response received', {
          id: payload.id,
          status: response.status,
          hasError: !!response.data?.error,
        });

        return this.parseResponse(response.data, response.status, payload);
      } catch (error) {
        lastError = error;
        const status = axios.isAxiosError(error)
          ? error.response?.status
          : undefined;

        if (attempt < this.retries && this.isRetryableStatus(status)) {
          this.logger.warn(
            `RPC request failed, retrying in ${this.retryDelay}ms`,
            {
              attempt: attempt + 1,
              status,
            },
          );
          await this.sleep(this.retryDelay);
        } else {
          break;
        }
      }
    }

    return this.toRpcError(lastError, payload);
  }

  /**
   * Executes a JSON-RPC method.
   * @param method RPC method name.
   * @param params RPC params (array or object).
   * @param config Optional per-call Axios request config.
   * @returns Result data or `RpcError`.
   */
  async request<TResult = unknown>(
    method: string,
    params: unknown = [],
    config: RawAxiosRequestConfig = {},
  ): Promise<RpcResult<TResult>> {
    try {
      this.validateRequest(method);
      const payload = this.createPayload(method, params);
      return await this.makeRequestWithRetry<TResult>(payload, config);
    } catch (error) {
      this.logger.error('RPC request validation failed', error);
      return {
        code: 400,
        message: error instanceof Error ? error.message : 'Invalid request',
        name: 'ValidationError',
        status: 400,
        type: 'ValidationError',
      };
    }
  }

  /**
   * Executes multiple RPC requests in one JSON-RPC batch call.
   * @param requests Batch request definitions.
   * @param config Optional per-call Axios request config.
   * @returns Raw batch response array (may include errors).
   */
  async batchRequest<TResult = unknown>(
    requests: BatchRequest[],
    config: RawAxiosRequestConfig = {},
  ): Promise<RpcBatchResponse<TResult>> {
    if (!Array.isArray(requests) || requests.length === 0) {
      throw new Error('Batch requests must be a non-empty array');
    }

    requests.forEach((request) => this.validateRequest(request.method));
    const payload = this.createBatchPayload(requests);

    this.logger.info(`Sending batch RPC request with ${requests.length} calls`);

    const response = await this.instance.post<RpcBatchResponse<TResult>>(
      this.url,
      payload,
      {
        ...this.options,
        ...config,
        headers: {
          ...(this.headers ?? {}),
          ...(config.headers ?? {}),
        },
      },
    );

    if (!Array.isArray(response.data)) {
      throw new Error('Batch response must be an array');
    }

    return response.data;
  }

  /**
   * Executes a JSON-RPC method and throws on error.
   */
  async requestOrThrow<TResult = unknown>(
    method: string,
    params: unknown = [],
    config: RawAxiosRequestConfig = {},
  ): Promise<TResult> {
    const result = await this.request<TResult>(method, params, config);

    if (Client.isRpcError(result)) {
      throw result;
    }

    return result;
  }

  /**
   * Executes a batch RPC request and throws when any item fails.
   */
  async batchRequestOrThrow<TResult = unknown>(
    requests: BatchRequest[],
    config: RawAxiosRequestConfig = {},
  ): Promise<RpcBatchResponse<TResult>> {
    const results = await this.batchRequest<TResult>(requests, config);
    const hasErrors = results.some((response) => Client.isRpcError(response));

    if (hasErrors) {
      throw new Error(`One or more batch requests failed: ${JSON.stringify(results)}`);
    }

    return results;
  }
}

/**
 * Creates a generic JSON-RPC client.
 */
export const createClient = (config: Config): Client => new Client(config);

/**
 * Creates a generic RPC client from optional partial config.
 *
 * Useful when composing config from multiple sources before final client init.
 */
export const createClientFromConfig = (config: EnvClientConfig): Client => {
  if (!config.url) {
    throw new Error('Missing RPC URL. Set config.url or provide RPC_URL in createClientFromEnv().');
  }

  return new Client({
    ...config,
    url: config.url,
  });
};

/**
 * Creates a generic RPC client from environment variables.
 *
 * Supported variables:
 * - `RPC_USER`
 * - `RPC_PASSWORD`
 * - `RPC_URL` (required)
 * - `RPC_TIMEOUT` (milliseconds)
 * - `RPC_RETRIES`
 * - `RPC_RETRY_DELAY` (milliseconds)
 * - `RPC_LOG_LEVEL` (debug | info | warn | error | none)
 */
export const createClientFromEnv = (env: EnvLike = getDefaultEnv()): Client => {
  const url = env.RPC_URL;

  if (!url) {
    throw new Error('Missing RPC_URL in environment configuration.');
  }

  const timeout = parseOptionalNumber(env.RPC_TIMEOUT);
  const retries = parseOptionalNumber(env.RPC_RETRIES);
  const retryDelay = parseOptionalNumber(env.RPC_RETRY_DELAY);

  const logLevel =
    env.RPC_LOG_LEVEL === 'debug' ||
    env.RPC_LOG_LEVEL === 'info' ||
    env.RPC_LOG_LEVEL === 'warn' ||
    env.RPC_LOG_LEVEL === 'error' ||
    env.RPC_LOG_LEVEL === 'none'
      ? env.RPC_LOG_LEVEL
      : undefined;

  return createClientFromConfig({
    url,
    username: env.RPC_USER,
    password: env.RPC_PASSWORD,
    timeout,
    retries,
    retryDelay,
    logLevel,
  });
};

/**
 * @deprecated Use `createClientFromConfig` instead.
 */
export const createConfiguredClient = createClientFromConfig;

/**
 * @deprecated Use `createClientFromEnv` instead.
 */
export const fromEnvConfig = createClientFromEnv;

export default Client;
