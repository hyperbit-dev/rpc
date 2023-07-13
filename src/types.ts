export type Config = {
  url: string; // http://127.0.0.1:9050
  username?: string; // rpc username
  password?: string; // rpc password
  httpOptions?: any; // object
  headers?: Record<string, any>;
};

export type Options = {
  auth?: {
    username: string;
    password: string;
  };
  [k: string]: any; // httpOptions
};

export type RpcError = {
  code: number;
  data: any;
  message: string;
  name: string;
  status: number;
};
