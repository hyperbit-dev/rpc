export type AuthorizeFn = (
  remoteAddress: string | undefined, // ip address
  localPort: number | undefined,
  address: string, // workerName xxxxxxxxx.x
  workerPassword: string,
  extraNonce1: string | null,
  version: number | string | null,
  cb: AuthorizeFnCallback
) => void;

export type AuthorizeFnCallback = ({
  error,
  authorized,
  disconnect,
}: {
  error: any;
  authorized: boolean;
  disconnect: boolean;
}) => void;

export type Banning = {
  checkThreshold: number;
  enabled: boolean;
  invalidPercent: number;
  purgeInterval: number;
  time: number;
};

export type JobParams = [
  number | string, // jobId
  string, // header_hash
  string, // seedhash
  string, // target
  boolean,
  number, // rpcData heigth
  number | string, // rpcData bits
];

export type ClientHandleSubmit = {
  id: number;
  jsonrpc?: "2.0";
  method: string;
  params: string[];
  worder: string;
};
