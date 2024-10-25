import BlockchainFactory from '#services/blockchain.factory'

export default class IndexerService {
  static async indexByBlockHash(symbol: string, blockhash: string) {
    const blockchain = BlockchainFactory.getService(symbol)
    const block = await blockchain.getblock({ blockhash, verbose: 2 })
    console.log('block', JSON.stringify(block, null, 2))
    if (!block) {
      throw new Error('Block not found')
    }
  }
}
