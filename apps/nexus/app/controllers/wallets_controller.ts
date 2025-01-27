import Wallet from '#models/wallet'
import { walletValidator } from '#validators/wallet'
import rpcService from '#services/rpc.service'
import type { HttpContext } from '@adonisjs/core/http'
import WalletUser from '#models/wallet_user'
import { createWallet } from '#abilities/main'
import WalletRole from '#models/wallet_role'
import WalletUserRole from '#models/wallet_user_role'
import WalletAddress from '#models/wallet_address'
import Blockchain from '#models/blockchain'
import RedisService from '#services/redis_service'

export default class WalletsController {
  /**
   * @index
   * @paramQuery page
   * @paramQuery limit
   * @paramQuery id
   * @paramQuery name
   * @paramQuery symbol
   * @paramQuery externalChainId
   * @paramQuery active
   * @paramQuery createdAt
   * @paramQuery updatedAt
   * @responseBody 200 - <Wallet[]>
   */
  async index({ auth, request, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    const query = Wallet.query().preload('blockchain')
    const queryParams = request.qs()
    let page = 1
    let limit = 10

    for (const [key, value] of Object.entries(queryParams)) {
      switch (key) {
        case 'page':
          page = Math.max(Number(value) || 1, 1)
          break
        case 'limit':
          limit = Math.min(Number(value) || 25, 25)
          break
        case 'label':
          query.where(key, 'LIKE', `%${value}%`)
          break
        case 'id':
        case 'blockchainId':
        case 'externalId':
        case 'createdAt':
        case 'updatedAt':
          query.where(key, value)
          break
        default:
          break
      }
    }

    const wallets = await query
      .preload('addresses')
      .withCount('addresses', (query) => {
        query.as('totalAddresses')
      })
      .where('user_id', auth.user.id)
      .paginate(page, limit)

    const paginationJSON = wallets.serialize()

    paginationJSON.data = await Promise.all(
      paginationJSON.data.map(async (wallet, index) => {
        let totalBalance
        let totalAssets
        let marketData

        try {
          marketData = await RedisService.getMarketData(wallet.blockchain.name.toLowerCase())
        } catch (error) {
          console.error('Error fetching market data:', error)
        }

        const addresses = wallets[index]?.addresses ?? []
        if (addresses.length) {
          try {
            const addr = addresses.map((address: WalletAddress) => address.address)
            totalBalance = await rpcService.request(
              wallet.blockchain.externalChainId,
              'getaddressbalance',
              [{ addresses: addr }]
            )
          } catch (error) {
            console.error('Error fetching balance:', error)
          }
          try {
            const addr = addresses.map((address: WalletAddress) => address.address)
            // Fetch asset balances
            totalAssets = await (
              await Promise.all(
                addr.map(async (address) => {
                  try {
                    const res = await rpcService.request(
                      wallet.blockchain.externalChainId,
                      'listassetbalancesbyaddress',
                      [address, true] // Fetching per address
                    )
                    return res
                  } catch (error) {
                    console.error(`Error fetching asset balances for address ${address}:`, error)
                    return { result: 0 }
                  }
                })
              )
            ).reduce((acc, cur) => (acc += cur.result), 0)
          } catch (error) {
            console.error('Error fetching asset balances:', error)
          }
        }

        return {
          ...wallet,
          addresses: undefined,
          totalAddresses: wallets[index].$extras.totalAddresses,
          totalBalance: totalBalance ?? null,
          totalAssets: totalAssets ?? null,
          marketData: marketData ?? null,
        }
      })
    )

    return paginationJSON
  }

  /**
   * @show
   * @responseBody 200 - <Wallet>.append("totalAddresses": "number").with(blockchain)
   */
  async show({ auth, request, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    const userId = auth.user.id
    const id = request.param('id')

    const wallet = await Wallet.query()
      .withCount('addresses', (query) => {
        query.as('totalAddresses')
      })
      .preload('blockchain')
      .preload('addresses')
      .where('id', id)
      .andWhere('user_id', userId)
      .first()

    if (!wallet) {
      return response.notFound()
    }

    const w = wallet.serialize()

    try {
      const marketData = await RedisService.getMarketData([wallet.blockchain.name.toLowerCase()])
      const marketChart = await RedisService.getMarketChart(wallet.blockchain.name.toLowerCase())
      w.marketData = marketData ?? null
      w.marketChart = marketChart ?? null
    } catch (error) {
      console.error('Error fetching market data:', error)
    }

    try {
      const addr = wallet.addresses.map((address: WalletAddress) => address.address)
      const totalBalance = await rpcService.request(
        wallet.blockchain.externalChainId,
        'getaddressbalance',
        [{ addresses: addr }]
      )
      w.totalBalance = totalBalance ?? null
    } catch (error) {
      console.error('Error fetching balance:', error)
    }

    w.addresses = undefined

    return w
  }

  async createWallet({ auth, bouncer, request, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    let blockchain
    const userId = auth.user.id
    const payload = request.only(['externalId', 'blockchainId', 'label', 'addresses'])

    try {
      await walletValidator.validate(payload)

      blockchain = await Blockchain.find(payload.blockchainId)

      if (!blockchain) {
        return response.badRequest('invalid chain id')
      }

      if (blockchain.active === false) {
        return response.badRequest('blockchain is not available')
      }

      const wallets = (await Wallet.findManyBy({
        blockchainId: blockchain.id,
        userId,
      })) as Wallet[]

      if (await bouncer.denies(createWallet, blockchain.id, wallets)) {
        return response.forbidden({ message: 'Wallet limit reached' })
      }
    } catch (error) {
      return response.internalServerError({ message: 'Internal server error' })
    }

    const { externalId, label } = payload

    try {
      const wallet = new Wallet()
      wallet.externalId = externalId
      wallet.blockchainId = blockchain!.id
      wallet.label = label
      wallet.userId = userId
      await wallet.save()

      if (Array.isArray(payload.addresses)) {
        const addresses = payload.addresses.map((address) => {
          return {
            walletId: wallet.id,
            ...address,
          }
        })
        await WalletAddress.createMany(addresses)
      }

      const walletUser = new WalletUser()
      walletUser.userId = userId
      walletUser.walletId = wallet.id
      await walletUser.save()

      let role = await WalletRole.findBy('name', 'admin')
      if (!role) {
        role = new WalletRole()
        role.name = 'admin'
        await role.save()
      }

      const walletUserRole = new WalletUserRole()
      walletUserRole.walletId = wallet.id
      walletUserRole.userId = userId
      walletUserRole.walletRoleId = role.id
      await walletUserRole.save()

      // if (accounts) {
      //   Object.keys(accounts).forEach(async (index) => {
      //     const account = accounts[index]
      //     const acc = new WalletAccount()

      //     acc.walletId = wallet.id
      //     acc.index = index
      //     acc.label = accounts[index].label
      //     await acc.save()

      //     const externalAddresses = Object.keys(account.external).map((path) => {
      //       const a = new WalletAddress()
      //       a.walletAccountId = acc.id
      //       a.path = path
      //       a.address = account.external[path].address
      //       a.type = 'EXTERNAL'
      //       return a
      //     })
      //     const changeAddresses = Object.keys(account.change).map((path) => {
      //       const a = new WalletAddress()
      //       a.walletAccountId = acc.id
      //       a.path = path
      //       a.address = account.change[path].address
      //       a.type = 'CHANGE'
      //       return a
      //     })

      //     await WalletAddress.createMany([...externalAddresses, ...changeAddresses])
      //   })
      // }

      return wallet
    } catch (error) {
      console.log('error', error)
      if (error.code === 'ER_DUP_ENTRY') {
        return response.status(400).send('Cannot create wallet with the same external id')
      }
      return response.status(400).send('Invalid request')
    }
  }

  async getWalletBalance({ auth, request, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    const userId = auth.user.id
    const id = request.param('id')

    try {
      const wallet = await Wallet.query()
        .preload('blockchain')
        .preload('addresses')
        .where('id', id)
        .whereHas('users', (query) => {
          query.where('user_id', userId)
        })
        .first()

      if (!wallet) {
        return response.notFound()
      }

      const addresses = wallet.addresses.map((address) => address.address)

      const res = await rpcService.request(wallet.blockchain.externalChainId, 'getaddressbalance', [
        { addresses },
      ])
      return res
    } catch (error) {
      return response.internalServerError('Internal server error')
    }
  }
}
