import axios, { Axios } from 'axios';
import { Config, Options, RpcError } from './types';

/**
 * Create a RPC Client to connect to a blockchain node.
 * @param config
 * @param {string} config.url Url endpoint to connect to node server
 * @param {string=} config.username RPC (optional) - username
 * @param {string=} config.password RPC (optional) - password
 * @param {Objct=} config.httpOptions HTTP options (optional) - object of values to add to request headers
 * @param {string=} config.headers (optional) Object of headers required by other services (e.g. API_key)
 * @example
 * import Client from '@hyperbitjs/rpc';

  const client = new Client({
    url: 'http://127.0.0.1:9050',
    username: 'username',
    password: 'password',
  });

  client.request('rpc_command', []).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  });
*/
export class Client {
  private _url: string;
  private _options: Options = {};
  private _instance: Axios = axios.create();
  private _headers?: Record<string, any>;

  constructor(config: Config) {
    this._instance.defaults.validateStatus = status => {
      return status >= 200 && status < 400;
    };

    this._instance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );

    this._url = config.url;
    this._headers = config.headers;

    if (config.username && config.password) {
      this._options.auth = {
        username: config.username,
        password: config.password,
      };
    }

    if (config.httpOptions) {
      for (let k in config.httpOptions) {
        this._options[k] = config.httpOptions[k];
      }
    }
  }

  /**
   *
   * @returns
   */
  toJSON(): {
    url: string;
    options: Options;
  } {
    return JSON.parse(
      JSON.stringify({
        url: this._url,
        options: this._options,
      })
    );
  }

  /**
   * Make a RPC request with a method command and payload
   * @param {string} method Name of rpc command.
   * @param {(Object|Array)=} params Data required by rpc command. Typically an object or an array.
   * @returns {Promise}
   */
  request(method: string, params: any = []): Promise<any | RpcError> {
    const data: Record<string, any> = {
      jsonrpc: '2.0',
      id: Math.random(),
      method,
      params,
      ...this._headers,
    };

    return this._instance
      .post(this._url, data, this._options)
      .then(res => (res.data?.result ? res.data.result : res.data))
      .catch(err => {
        return {
          code: err.response?.status || 500,
          data: err.response?.config?.data,
          message:
            err.response?.data?.error?.message ||
            err.response?.message ||
            err?.message ||
            'Unknown request failure. Please review: rpc command, arguments and connection.',
          name: err.response?.statusText,
          status: err.response?.status || 500,
        };
      });
  }
}

export default Client;
