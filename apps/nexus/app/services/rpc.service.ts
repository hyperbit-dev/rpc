import { rpcConfig } from '#config/rpc'
import { RpcCommand } from '#validators/rpc'
import { Client } from '@hyperbitjs/rpc'

type RpcClient = Client & {
  chainId: string
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
      client.chainId = config.chains[blockchain].id
      this.clients.push(client)
    }
  }

  request(chainId: string, command: RpcCommand, params: any[], _id?: string) {
    const client = this.client(chainId)
    if (client) {
      // TODO : id
      return client.request(command, params, {})
    }
  }

  client(chainId: string) {
    return this.clients.find((x: RpcClient) => x.chainId === chainId)
  }

  batch(chainId: string, requests: { command: string; params: any[] }[]) {
    const client = this.client(chainId)
    if (client) {
      return Promise.allSettled(requests.map((x) => client.request(x.command, x.params)))
    } else {
      return Promise.reject('Client not found')
    }
  }
}

const rpcService = new RpcService()
export default rpcService
