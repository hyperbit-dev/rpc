import Blockchain from '#models/blockchain'
import Wallet from '#models/wallet'
import WalletAccount from '#models/wallet_account'
import WalletAccountAddress from '#models/wallet_account_address'
import WalletPolicy from '#policies/wallet_policy'
import { walletValidator } from '#validators/wallet'
import type { HttpContext } from '@adonisjs/core/http'

export default class WalletsController {
  async index({ auth, request }: HttpContext) {
    const payload = request.only(['page', 'limit'])
    const page = payload.page ?? 1
    const limit = payload.limit ?? 10

    const wallets = await Wallet.query()
      .preload('addresses')
      .preload('blockchain')
      .where('user_id', auth.user!.id)
      .paginate(page, limit)

    return wallets
  }

  async create({ auth, bouncer, request, response }: HttpContext) {
    const payload = request.only(['externalId', 'chainId', 'label', 'accounts'])
    const data = await walletValidator.validate(payload)

    if (await bouncer.with(WalletPolicy).denies('create', data.chainId)) {
      return response.forbidden('Wallet limit reached')
    }

    const { externalId, chainId, label, accounts } = payload

    const blockchain = await Blockchain.findBy('chain_id', chainId)

    if (!blockchain) {
      return response.badRequest('invalid chain id')
    }

    try {
      const wallet = new Wallet()
      wallet.externalId = externalId
      wallet.blockchainId = blockchain.id
      wallet.label = label
      wallet.userId = auth.user!.id
      await wallet.save()

      if (!!accounts) {
        Object.keys(accounts).forEach(async (index) => {
          const account = accounts[index]
          const acc = new WalletAccount()

          acc.walletId = wallet.id
          acc.index = index
          acc.label = accounts[index].label
          await acc.save()

          const externalAddresses = Object.keys(account.external).map((path) => {
            const a = new WalletAccountAddress()
            a.walletAccountId = acc.id
            a.path = path
            a.address = account.external[path].address
            a.type = 'EXTERNAL'
            return a
          })
          const changeAddresses = Object.keys(account.change).map((path) => {
            const a = new WalletAccountAddress()
            a.walletAccountId = acc.id
            a.path = path
            a.address = account.change[path].address
            a.type = 'CHANGE'
            return a
          })

          await WalletAccountAddress.createMany([...externalAddresses, ...changeAddresses])
        })
      }

      return wallet
    } catch (error) {
      return response.badRequest()
    }
  }
}
