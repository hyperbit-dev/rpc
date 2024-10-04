// import rpcService from '#services/rpc.service'
import { BlockchainService } from '#services/blockchain.service'

export default class RavencoinService extends BlockchainService {
  constructor(symbol: string, network: string) {
    super(symbol, network)
  }
}
