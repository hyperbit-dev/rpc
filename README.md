![Hyperbit Chains Banner](https://github.com/hyperbit-dev/rpc/raw/master/media/repo-banner.png)

# Hyperbit - RPC

Simple Rpc Client for making requests to blockchain nodes.

## Getting Started

```sh
# Using npm
npm install @hyperbitjs/rpc

# Using yarn
yarn add @hyperbitjs/rpc
```

### Usage

```javascript
import { Client } from '@hyperbitjs/rpc';

const client = new Client({
  url: 'http://127.0.0.1:9050',
  username: 'username',
  password: 'password',
});

client.request('getchaintips').then(response => {
  console.log('response', response);
});
```