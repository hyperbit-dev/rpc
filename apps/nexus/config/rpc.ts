import { chains } from '@hyperbitjs/chains'

export const rpcConfig = {
  chains: {
    mewc: {
      id: chains.mewc.mainnet.id,
      host: 'https://143.198.99.182:9766',
      rpcuser: 'Emperor3918',
      rpcpassword: 'rR47KZUMmt94',
    },
    trvn: {
      id: chains.rvn.testnet.id,
      host: 'http://127.0.0.1:18766',
      rpcuser: 'rpcuser',
      rpcpassword: 'rpcpassword',
    },
  },
}
