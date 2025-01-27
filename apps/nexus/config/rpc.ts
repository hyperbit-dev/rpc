import { chains } from '@hyperbitjs/chains'

export const rpcConfig = {
  chains: {
    evr: {
      id: chains.evr.mainnet.id,
      host: 'http://159.223.109.19:8819',
      rpcuser: 'Emperor3918',
      rpcpassword: 'rR47KZUMmt94',
    },
    tevr: {
      id: chains.evr.testnet.id,
      host: 'http://146.190.114.169:18819',
      rpcuser: 'Emperor3918',
      rpcpassword: 'rR47KZUMmt94',
    },
    mewc: {
      id: chains.mewc.mainnet.id,
      host: 'http://143.198.99.182:9766',
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
