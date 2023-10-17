export type Message = {
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
};
/**
${scheme}:// ${domain} wants you to sign in with your Ethereum account:
${address}

${statement}

URI: ${uri}
Version: ${version}
Chain ID: ${chain-id}
Nonce: ${nonce}
Issued At: ${issued-at}
Expiration Time: ${expiration-time}
Not Before: ${not-before}
Request ID: ${request-id}
Resources:
- ${resources[0]}
- ${resources[1]}
...
- ${resources[n]}
*/