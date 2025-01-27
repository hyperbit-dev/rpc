import Blockchain from '#models/blockchain'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { chains } from '@hyperbitjs/chains'

export default class extends BaseSeeder {
  async run() {
    const blockchains: any[] = []

    Object.values(chains).forEach((chain) => {
      Object.keys(chain).forEach((network) => {
        const blockchain = chain[network]
        let active = false
        if (
          network === 'testnet' &&
          (blockchain.name === 'Ravencoin' || blockchain.name === 'Evrmore')
        ) {
          active = true
        }
        if (
          network === 'mainnet' &&
          (blockchain.name === 'Evrmore' ||
            blockchain.name === 'Meowcoin' ||
            blockchain.name === 'Meow Coin')
        ) {
          active = true
        }

        if (network === 'mainnet' || network === 'testnet' || network === 'regtest') {
          blockchains.push({
            // @ts-ignore
            name: blockchain.name,
            network,
            externalChainId: blockchain.id,
            symbol: blockchain.symbol,
            active,
          })
        }
      })
    })

    await Blockchain.updateOrCreateMany('name', blockchains)
  }
}
