import RavencoinService from '#services/ravencoin.service'

export default class BlockchainFactory {
  static getService(symbol: string) {
    const s = symbol.toLowerCase()
    switch (s) {
      case 'rvn':
        return new RavencoinService('rvn', 'mainnet')
      case 'trvn':
        return new RavencoinService('rvn', 'testnet')
      default:
        throw new Error('Unsupported blockchain')
    }
  }
}