import { rpcConfig } from '#config/rpc'
import { RpcCommand } from '#validators/rpc'
import { Client } from '@hyperbitjs/rpc'

type RpcClient = Client & {
  externalChainId: string
}

type ChainConfig = {
  [key: string]: {
    id: string
    host: string
    rpcuser: string
    rpcpassword: string
  }
}

class RpcService {
  clients: RpcClient[] = []

  constructor() {
    const config = rpcConfig as { chains: ChainConfig }

    for (const blockchain in config.chains) {
      const client = new Client({
        url: config.chains[blockchain].host,
        username: config.chains[blockchain].rpcuser,
        password: config.chains[blockchain].rpcpassword,
      }) as RpcClient
      client.externalChainId = config.chains[blockchain].id
      this.clients.push(client)
    }
  }

  async request(externalChainId: string, command: RpcCommand, params: any[], _id?: string) {
    const client = this.client(externalChainId.toLowerCase())
    if (client) {
      // TODO : id
      const res = await client.request(command, params, {})
      if (res.code === 500 || res.status === 500) {
        throw new Error(res.message)
      }
      return res
    }
  }

  client(externalChainId: string) {
    return this.clients.find(
      (x: RpcClient) => x.externalChainId.toLowerCase() === externalChainId.toLowerCase()
    )
  }

  batch(externalChainId: string, requests: { command: string; params: any[] }[]) {
    const client = this.client(externalChainId.toLowerCase())
    if (client) {
      return Promise.all(requests.map((x) => client.request(x.command, x.params)))
    } else {
      return Promise.reject('Client not found')
    }
  }
}

const rpcService = new RpcService()
export default rpcService
