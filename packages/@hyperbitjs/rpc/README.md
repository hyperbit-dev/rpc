# @hyperbitjs/rpc

![Hyperbit Chains Banner](https://github.com/hyperbit-dev/rpc/raw/master/media/repo-banner.png)

# Hyperbit - RPC

A simple, typed JSON-RPC client for any JSON-RPC service.

## Install

```sh
# Using npm
npm install @hyperbitjs/rpc

# Using yarn
yarn add @hyperbitjs/rpc
```

Optional setup:

- Copy [rpc/.env.example](rpc/.env.example) to `.env` and fill values before running examples.

## 30-Second Quick Start

```javascript
import { createClient } from '@hyperbitjs/rpc';

const rpc = createClient({
  url: process.env.RPC_URL,
  username: process.env.RPC_USER,
  password: process.env.RPC_PASSWORD,
});

const info = await rpc.requestOrThrow('getblockchaininfo');
console.log(info);
```

### One-line env setup

```javascript
import { createClientFromEnv } from '@hyperbitjs/rpc';

const rpc = createClientFromEnv();
const info = await rpc.requestOrThrow('getblockchaininfo');
console.log(info);
```

Run the example script after building:

```sh
npm run build
node examples/from-env.mjs
```

## Quick Start (Any JSON-RPC Node)

```javascript
import { Client, createClient } from '@hyperbitjs/rpc';

const client = createClient({
  url: 'http://127.0.0.1:9050',
  username: 'username',
  password: 'password',
});

const response = await client.request('getchaintips');

if (Client.isRpcError(response)) {
  console.error('RPC error', response);
} else {
  console.log('RPC result', response);
}
```

### Same call with params

```javascript
const tx = await client.request('getrawtransaction', ['<txid>', true]);

if (!Client.isRpcError(tx)) {
  console.log(tx);
}
```

## Throw-on-error usage

```javascript
import { Client } from '@hyperbitjs/rpc';

const client = new Client({
  url: 'http://127.0.0.1:9050',
  auth: { username: 'username', password: 'password' },
});

const blockCount = await client.requestOrThrow('getblockcount');
console.log(blockCount);
```

## Batch requests

```javascript
const results = await client.batchRequest([
  { method: 'getblockcount' },
  { method: 'getdifficulty' },
]);

console.log(results);
```

## API Reference

- `new Client(config)` - create RPC client instance.
- `createClient(config)` - ergonomic factory function.
- `createClientFromConfig(config)` - create client from optional/partial config with required URL enforcement.
- `createClientFromEnv(env?)` - create client from `RPC_*` env vars.
- `client.request(method, params?, requestConfig?)` - returns result or `RpcError`.
- `client.requestOrThrow(method, params?, requestConfig?)` - throws on error.
- `Client.isRpcError(value)` - type-safe error guard.

## Config

- `url` (required): RPC endpoint.
- `username` / `password` (optional): basic auth credentials.
- `auth` (optional): `{ username, password }` alternative to username/password fields.
- `headers` (optional): custom request headers.
- `httpOptions` (optional): default Axios request options.

## Error handling

`request()` returns either a result or a typed `RpcError`.

Common error types:

- `ValidationError`: invalid local call data (for example empty method name).
- `RpcError`: server responded with an RPC/HTTP error.
- `ServerUnreachable`: node could not be reached (bad URL, node down, etc.).

## Best practice implementation pattern

```javascript
const result = await client.request('getblockcount');

if (Client.isRpcError(result)) {
  // centralize logging/telemetry here
  console.error(result.type, result.message, result.description);
  return;
}

console.log(result);
```

## Troubleshooting

### 1) `ServerUnreachable`

What it means:

- Your app cannot reach the node at the configured URL.

Quick checks:

- Confirm the node process is running.
- Confirm URL/port are correct for your RPC service.
- Make sure firewall/container networking allows access.

### 2) Auth errors (`401` / `403`)

What it means:

- Credentials are invalid or missing.

Quick checks:

- Verify `rpcuser` and `rpcpassword` in your node config.
- Verify your app is using the same username/password.
- Prefer one auth style only:
  - `auth: { username, password }`
  - or `username` + `password`

### 3) `ValidationError`

What it means:

- Local request is invalid before sending.

Quick checks:

- Ensure method name is a non-empty string.
- Ensure params are array/object values expected by the RPC method.

### 4) Method-level RPC errors

What it means:

- Node was reached, but RPC call failed (bad params, unknown method, wallet state, etc.).

Quick checks:

- Try the same method directly in your node RPC console.
- Double-check method name and parameter order.
- Log `error.code`, `error.message`, and `error.description` from `RpcError`.

## Production checklist

- **Timeouts:** set `timeout` explicitly (for example `15000`–`30000`) based on your SLA.
- **Retries:** use small retry counts (`retries: 1` or `2`) and short `retryDelay` for transient failures.
- **Logging:** use `logLevel: 'warn'` or `logLevel: 'error'` in production to reduce noise.
- **Secrets:** load RPC credentials from environment variables, never hard-code in source.
- **Health checks:** run a lightweight call like `getblockcount` on startup/readiness checks.
- **Error handling:** centralize handling for `ServerUnreachable`, `RpcError`, and `ValidationError`.
- **Batch safety:** validate batch inputs and handle partial failures before assuming all responses succeeded.

Example production config:

```javascript
import { createClient } from '@hyperbitjs/rpc';

export const rpc = createClient({
  url: process.env.RPC_URL,
  username: process.env.RPC_USER,
  password: process.env.RPC_PASSWORD,
  timeout: 20000,
  retries: 1,
  retryDelay: 750,
  logLevel: 'warn',
});
```

## Overview
This project lives at `rpc` and is part of the broader multi-project workspace.
**Description:** No description provided yet.
## Purpose
- Deliver the core capability owned by this project.
- Provide stable commands and interfaces for other apps/packages in the workspace.
- Keep implementation details localized so changes stay maintainable.
## Architecture Notes
- Type: **Project**
- Package manager metadata source: `package.json`
- Runtime entry hints: `dist/index.cjs`
## Setup
1. Install dependencies from this directory:
```bash
npm install
```
2. Run key scripts as needed (see script table below).
3. Environment template exists at `.env.example`.
## NPM Scripts
| Script | Command |
|---|---|
| `clean` | `node -e "require('fs').rmSync('dist',{recursive:true,force:true})"` |
| `build` | `vite build` |
| `prebuild` | `npm run clean` |
| `test` | `vitest --run` |
| `test:watch` | `vitest` |
| `lint` | `eslint .` |
| `lint:fix` | `eslint . --fix && prettier --write .` |
| `format` | `prettier --write .` |
| `type-check` | `tsc --noEmit` |
## Dependencies
### Production
- `axios`: `^1.7.0`
### Development
- `@typescript-eslint/eslint-plugin`: `^7.18.0`
- `@typescript-eslint/parser`: `^7.18.0`
- `eslint`: `^8.57.0`
- `prettier`: `^3.3.3`
- `typescript`: `~5.5.4`
- `vite`: `^6.4.1`
- `vitest`: `^4.0.18`
## Configuration
- Primary config source: `package.json`
- Environment template: `.env.example`
- Add project-specific operational notes to `MEMORY_BANK.md`.
## Development Workflow
1. Make changes in focused modules.
2. Run the smallest relevant script/test first.
3. Run full validation scripts before merging.
4. Update this README and memory bank whenever behavior/contracts change.
## Testing and Validation
- Prefer script-driven checks from the table above (for example: `test`, `build`, `lint`).
- If this project has no tests yet, add smoke checks and document them in `MEMORY_BANK.md`.
## LLM Context
When using an LLM coding assistant in this folder, always include:
- Exact target file paths and expected behavior changes.
- Validation command(s) run after edits.
- Runtime/config assumptions (.env, API keys, ports, external services).

## Memory Bank
See `MEMORY_BANK.md` for operational context, commands, and troubleshooting notes.
