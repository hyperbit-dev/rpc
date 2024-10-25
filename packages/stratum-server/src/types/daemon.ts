import { Config } from '@hyperbitjs/rpc';

export type Daemon = Omit<Config, 'url'> & {
  url?: string;
  host?: string;
  port?: number | string;
};

export type Kawpowhash = {
  digest: string;
  result: string;
  mix_hash: string;
  meets_target: boolean;
};

export type Progpowhash = {
  digest: string;
  result: string;
  mix_hash: string;
  meets_target: boolean;
};
