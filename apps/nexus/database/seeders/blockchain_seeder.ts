import Blockchain from '#models/blockchain'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { chains } from '@hyperbitjs/chains'

export default class extends BaseSeeder {
  async run() {
    const blockchains: any[] = []
    Object.values(chains).forEach((chain) => {
      // @ts-ignore
      Object.keys(chain).forEach((key) => {
        if (key === 'mainnet' || key === 'testnet' || key === 'regtest') {
          blockchains.push({
            // @ts-ignore
            chain_id: chain[key].id.toLowerCase(),
            // @ts-ignore
            name: chain[key].name,
            symbol: chain[key].symbol,
            network: key.toUpperCase(),
            active: true,
          })
        }
      })
    })

    await Blockchain.updateOrCreateMany('chainId', blockchains)
  }
}
