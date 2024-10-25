import { chains, Network } from '@hyperbitjs/chains'
import rpcService from '#services/rpc.service'
import { RpcCommand, RpcCommands } from '#validators/rpc'

export class BlockchainService {
  network: Network

  constructor(symbol: string, network: string) {
    this.network = chains[symbol][network]
  }

  getblock({ blockhash, verbose = 1 }: { blockhash: string; verbose: number }) {
    return rpcService.request(this.network.id, 'getblock', [blockhash, verbose])
  }

  getblockcount() {
    return rpcService.request(this.network.id, 'getblockcount', [])
  }

  decodeblock(blockhex: string) {
    return rpcService.request(this.network.id, 'decodeblock', [blockhex])
  }

  getbestblockhash() {
    return rpcService.request(this.network.id, 'getbestblockhash', [])
  }

  getblockchaininfo() {
    return rpcService.request(this.network.id, 'getblockchaininfo', [])
  }

  getblockdeltas({ blockhash }: { blockhash: string }) {
    return rpcService.request(this.network.id, 'getblockdeltas', [blockhash])
  }

  getblockhash({ height }: { height: string }) {
    return rpcService.request(this.network.id, 'getblockhash', [height])
  }

  getchaintips() {
    return rpcService.request(this.network.id, 'getchaintips', [])
  }

  getdifficulty() {
    return rpcService.request(this.network.id, 'getdifficulty', [])
  }

  getblockheader({ hash, verbose = true }: { hash: string; verbose?: boolean }) {
    return rpcService.request(this.network.id, 'getblockheader', [hash, verbose])
  }

  decoderawtransaction({ hexstring }: { hexstring: string }) {
    return rpcService.request(this.network.id, 'decoderawtransaction', [hexstring])
  }

  decodescript({ hexstring }: { hexstring: string }) {
    return rpcService.request(this.network.id, 'decodescript', [hexstring])
  }

  getrawtransaction({ txid, verbose = false }: { txid: string; verbose?: boolean }) {
    return rpcService.request(this.network.id, 'getrawtransaction', [txid, verbose])
  }

  getaddressbalance({
    address,
    includeAssets = false,
  }: {
    address: string
    includeAssets?: boolean
  }) {
    return rpcService.request(this.network.id, 'getaddressbalance', [[address], includeAssets])
  }

  getaddresstxids({ address, start, end }: { address: string; start?: number; end?: number }) {
    return rpcService.request(this.network.id, 'getaddresstxids', [[address], start, end])
  }

  getaddressutxos({
    address,
    chainInfo,
    assetName,
  }: {
    address: string
    chainInfo?: boolean
    assetName?: string
  }) {
    return rpcService.request(this.network.id, 'getaddressutxos', [[address], chainInfo, assetName])
  }

  getaddressdeltas({
    address,
    start,
    end,
    chainInfo,
    assetName,
  }: {
    address: string
    start: number
    end: number
    chainInfo: boolean
    assetName?: string
  }) {
    return rpcService.request(this.network.id, 'getaddressdeltas', [
      [address],
      start,
      end,
      chainInfo,
      assetName,
    ])
  }

  validateaddress({ address }: { address: string }) {
    return rpcService.request(this.network.id, 'validateaddress', [address])
  }

  verifymessage({
    address,
    signature,
    message,
  }: {
    address: string
    signature: string
    message: string
  }) {
    return rpcService.request(this.network.id, 'verifymessage', [address, signature, message])
  }

  listassets({
    asset,
    verbose = false,
    count = 50000,
    start = 0,
  }: {
    asset: Exclude<string, '*'>
    verbose?: boolean
    count?: number
    start?: number
  }) {
    if (asset === '*') {
      throw new Error('Invalid asset name')
    }
    return rpcService.request(this.network.id, 'listassets', [asset, verbose, count, start])
  }

  listaddressesbyasset({
    asset_name,
    onlytotal = false,
    count = 50000,
    start = 0,
  }: {
    asset_name: Exclude<string, '*'>
    onlytotal?: boolean
    count?: number
    start?: number
  }) {
    if (asset_name === '*') {
      throw new Error('Invalid asset name')
    }
    return rpcService.request(this.network.id, 'listaddressesbyasset', [
      asset_name,
      onlytotal,
      count,
      start,
    ])
  }

  checkaddressrestriction({
    address,
    restricted_name,
  }: {
    address: string
    restricted_name: string
  }) {
    return rpcService.request(this.network.id, 'checkaddressrestriction', [
      address,
      restricted_name,
    ])
  }

  listaddressrestrictions({ address }: { address: string }) {
    return rpcService.request(this.network.id, 'listaddressrestrictions', [address])
  }

  listassetbalancebyaddress({
    address,
    onlytotal = false,
    count = 50000,
    start = 0,
  }: {
    address: string
    onlytotal?: boolean
    count?: number
    start?: number
  }) {
    return rpcService.request(this.network.id, 'listassetbalancebyaddress', [
      address,
      onlytotal,
      count,
      start,
    ])
  }

  getverifierstring({ restricted_name }: { restricted_name: string }) {
    return rpcService.request(this.network.id, 'getverifierstring', [restricted_name])
  }

  getsnapshot({ asset_name, block_height }: { asset_name: string; block_height: string }) {
    return rpcService.request(this.network.id, 'getsnapshot', [asset_name, block_height])
  }

  getassetdata({ asset_name }: { asset_name: string }) {
    return rpcService.request(this.network.id, 'getassetdata', [asset_name])
  }

  estimatesmartfee({
    conf_target,
    estimate_mode = 'CONSERVATIVE',
  }: {
    conf_target: number
    estimate_mode?: 'UNSET' | 'ECONOMICAL' | 'CONSERVATIVE'
  }) {
    return rpcService.request(this.network.id, 'estimatesmartfee', [conf_target, estimate_mode])
  }

  getblocktemplate({ template_request }: { template_request: any }) {
    return rpcService.request(this.network.id, 'getblocktemplate', [template_request])
  }

  getmininginfo() {
    return rpcService.request(this.network.id, 'getmininginfo', [])
  }

  getnetworkhashps({ nblocks = 120, height = 1 }: { nblocks?: number; height?: number }) {
    return rpcService.request(this.network.id, 'getnetworkhashps', [nblocks, height])
  }

  submitblock({ hexdata }: { hexdata: string }) {
    return rpcService.request(this.network.id, 'submitblock', [hexdata])
  }

  request(method: RpcCommands, params: any) {
    // @ts-ignore
    if (typeof this[method] === 'function') {
      // @ts-ignore
      return this[method](params)
    }
  }

  rawRequest({
    method,
    params,
    id,
  }: {
    jsonrpc: string
    method: RpcCommand
    params: any[]
    id: string
  }) {
    return rpcService.request(this.network.id, method, params, id)
  }
}
