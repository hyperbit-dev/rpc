import { Message } from "./types";

export class SiwbMessage {
  schema?: any;
  domain: string;
  address: string;
  statement?: string;
  uri: string;
  version: number;
  chainId: number; // bip44 designation
  chainSymbol: string; // btc
  nonce: string;
  issuedAt: number;
  expirationTime?: number;
  notBefore?: number;
  requestId?: string;
  resources: string; // "\n- "

  constructor(options: string | Partial<Message>) {
    if (typeof options === "string") {
      options = Object.assign(options, JSON.parse(options)) as Partial<Message>;
    }
    this.schema = options.schema;
    this.domain = options.domain as string;
    this.address = options.address as string;
    this.statement = options.statement;
    this.uri = options.uri as string;
    this.version = Number(options.version);
    this.chainId = Number(options.chainId);
    this.chainSymbol = options?.chainSymbol as string;
    this.nonce = options?.nonce as string;
    this.issuedAt = Number(options.issuedAt);
    this.expirationTime = options.expirationTime
      ? Number(options.expirationTime)
      : undefined;
    this.notBefore = options.notBefore ? Number(options.notBefore) : undefined;
    this.requestId = options.requestId;
    this.resources = options.resources as string;
  }
}
