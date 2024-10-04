import Wallet from '#models/wallet'
import { walletValidator } from '#validators/wallet'
import rpcService from '#services/rpc.service'
import type { HttpContext } from '@adonisjs/core/http'
import WalletUser from '#models/wallet_user'
import { createWallet } from '#abilities/main'
import Role from '#models/role'
import WalletUserRole from '#models/wallet_user_role'
import BlockchainNetwork from '#models/blockchain_network'
import WalletAddress from '#models/wallet_address'

export default class WalletsController {
  async listWallets({ auth, request, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    const payload = request.only(['page', 'limit', 'balances', 'addresses'])
    const page = payload.page ?? 1
    const limit = payload.limit ?? 10
    // const balances = payload.balances === 'true' ? true : false

    const walletsQuery = Wallet.query().preload('blockchain').preload('network')

    if (request.input('id')) {
      walletsQuery.where('id', request.input('id'))
    }
    if (request.input('externalId')) {
      walletsQuery.where('externalId', request.input('externalId'))
    }
    if (request.input('blockchainId')) {
      walletsQuery.where('blockchainId', request.input('blockchainId'))
    }
    if (request.input('networkId')) {
      walletsQuery.where('networkId', request.input('networkId'))
    }
    if (request.input('favorite')) {
      walletsQuery.where('favorite', request.input('favorite'))
    }
    if (request.input('label')) {
      walletsQuery.where('label', 'LIKE', `%${request.input('label')}%`)
    }
    if (request.input('created_at')) {
      walletsQuery.where('created_at', request.input('created_at'))
    }
    if (request.input('updated_at')) {
      walletsQuery.where('updated_at', request.input('updated_at'))
    }

    const wallets = await walletsQuery
      .withCount('addresses', (query) => {
        query.as('totalAddresses')
      })
      .where('user_id', auth.user.id)
      .paginate(page, limit)

    // try {
    //   if (balances) {
    //     const walletsWithBalances = wallets.map((wallet) => {
    //       wallet.addresses.map(async (address: AddressWithBalance) => {
    //         console.log('address', address)
    //         const balance = await rpcService.request(wallet.blockchain.chainId, 'getbalance', [
    //           address.address,
    //         ])
    //         console.log('balance', balance)
    //         address.balance = balance as unknown as number
    //         return address
    //       })
    //       // const balances = await Promise.allSettled(balanceRequests)
    //       // wallets.rows = wallets.rows.map((wallet, index) => {
    //       //   wallet.balance = balances[index].value
    //       //   return wallet
    //       // })
    //       return wallet
    //     })
    //     return walletsWithBalances
    //   }
    // } catch (error) {
    //   console.log('error', error)
    // }
    return wallets
  }

  async getWallet({ auth, request, response }: HttpContext) {
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
      .preload('network')
      .where('id', id)
      .andWhere('user_id', userId)
      .first()

    if (!wallet) {
      return response.notFound()
    }

    return wallet
  }

  async createWallet({ auth, bouncer, request, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    let network
    const userId = auth.user.id
    const payload = request.only(['externalId', 'blockchainId', 'networkId', 'label'])

    try {
      await walletValidator.validate(payload)

      network = await BlockchainNetwork.query()
        .where('id', payload.networkId)
        .preload('blockchain')
        .first()

      if (!network) {
        return response.badRequest('invalid chain id')
      }

      if (network.active === false) {
        return response.badRequest('blockchain is not available')
      }

      const wallets = (await Wallet.findManyBy({
        blockchainId: network.blockchain.id,
        networkId: network.id,
        userId,
      })) as Wallet[]

      if (await bouncer.denies(createWallet, network.blockchain.id, wallets)) {
        return response.forbidden('Wallet limit reached')
      }
    } catch (error) {
      console.log('error', error)
      return response.internalServerError('Internal server error')
    }

    const { externalId, label } = payload

    try {
      const wallet = new Wallet()
      wallet.externalId = externalId
      wallet.blockchainId = network.blockchain.id
      wallet.networkId = network.id
      wallet.label = label
      wallet.userId = userId
      await wallet.save()

      const walletUser = new WalletUser()
      walletUser.userId = userId
      walletUser.walletId = wallet.id
      await walletUser.save()

      let role = await Role.findBy('name', 'admin')
      if (!role) {
        role = new Role()
        role.name = 'admin'
        await role.save()
      }

      const walletUserRole = new WalletUserRole()
      walletUserRole.walletId = wallet.id
      walletUserRole.userId = userId
      walletUserRole.roleId = role.id
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
      const addresses = await WalletAddress.query()
        .preload('wallet', (query) => query.preload('network').where('user_id', userId))
        .where('wallet_id', id)

      const balanceRequests = addresses.map(async (address) => {
        return rpcService.request(address.wallet.network.chainId, 'getbalance', [address.address])
      })

      const res = await Promise.allSettled(balanceRequests)
      console.log('res', res)
      return res
    } catch (error) {
      return response.internalServerError('Internal server error')
    }
  }
}
