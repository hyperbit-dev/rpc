import Blockchain from '#models/blockchain'
import BlockchainNetwork from '#models/blockchain_network'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { chains } from '@hyperbitjs/chains'

export default class extends BaseSeeder {
  async run() {
    const blockchains: any[] = []
    const blockchainNetworks: any[] = []

    Object.values(chains).forEach((chain) => {
      Object.keys(chain).forEach((network) => {
        if (network === 'mainnet') {
          const blockchain = chain[network]
          const active =
            blockchain.name === 'Ravencoin' ||
            blockchain.name === 'Evrmore' ||
            blockchain.name === 'Neoxa' ||
            blockchain.name === 'Meowcoin' ||
            blockchain.name === 'Meow Coin'

          blockchains.push({
            // @ts-ignore
            name: blockchain.name,
            symbol: blockchain.symbol,
            active,
          })
        }
      })
    })

    const res = await Blockchain.updateOrCreateMany('name', blockchains)

    Object.values(chains).forEach((chain) => {
      Object.keys(chain).forEach((network) => {
        if (network === 'mainnet' || network === 'testnet' || network === 'regtest') {
          const blockchain = chain[network]
          const createdBlockchain = res.find((x) => x.name === blockchain.name)
          const active =
            blockchain.name === 'Ravencoin' ||
            blockchain.name === 'Evrmore' ||
            blockchain.name === 'Neoxa' ||
            blockchain.name === 'Meowcoin'

          blockchainNetworks.push({
            name: network,
            blockchainId: createdBlockchain!.id,
            chainId: blockchain.id,
            active,
          })
        }
      })
    })

    await BlockchainNetwork.updateOrCreateMany('chainId', blockchainNetworks)
  }
}
