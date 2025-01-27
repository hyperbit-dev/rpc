import redis from '@adonisjs/redis/services/main'
import rpcService from './rpc.service.js'

export default class TransactionService {
  static async getAddressTransactions({
    externalChainId,
    addresses,
    count = 5,
  }: {
    externalChainId: string
    addresses: string[]
    count: number
  }) {
    const key = `${externalChainId}:addresses:${addresses.join(',')}:recent_transactions:${count}`
    const cached = await redis.get(key)
    if (cached) {
      return JSON.parse(cached)
    }

    const txids = await rpcService.request(externalChainId, 'getaddresstxids', [{ addresses }])
    const transactions = await Promise.all(
      txids
        .reverse()
        .slice(0, count)
        .map((txid: string) => rpcService.request(externalChainId, 'getrawtransaction', [txid, 1]))
    )
    return transactions
  }
}
