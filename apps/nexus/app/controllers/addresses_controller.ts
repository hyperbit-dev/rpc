import Wallet from '#models/wallet'
import WalletAddress from '#models/wallet_address'
import type { HttpContext } from '@adonisjs/core/http'

type Address = {
  address: string
  label?: string
  path: string
}

export default class AddressesController {
  async getAll({ auth, request, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    const userId = auth.user.id

    const payload = request.only(['page', 'limit', 'walletId'])
    const page = payload.page ?? 1
    const limit = payload.limit ?? 10

    const addressesQuery = WalletAddress.query().pojo()

    if (request.input('wallet_id')) {
      addressesQuery.where('wallet_id', request.input('wallet_id'))
    }
    if (request.input('label')) {
      addressesQuery.where('label', 'LIKE', `%${request.input('label')}%`)
    }
    if (request.input('address')) {
      addressesQuery.where('address', 'LIKE', `%${request.input('address')}%`)
    }
    if (request.input('path')) {
      addressesQuery.where('path', 'LIKE', `%${request.input('path')}%`)
    }
    if (request.input('created_at')) {
      addressesQuery.where('created_at', request.input('created_at'))
    }
    if (request.input('updated_at')) {
      addressesQuery.where('updated_at', request.input('updated_at'))
    }

    addressesQuery
      .whereHas('wallet', (walletQuery) => {
        walletQuery.where('user_id', userId)
      })
      .where('wallet_id', payload.walletId ?? null)

    const addresses = await addressesQuery.paginate(page, limit)

    return addresses
  }

  async getSingle({ auth, request, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    const userId = auth.user.id

    const address = await WalletAddress.query()
      .where('id', request.param('id'))
      .whereHas('wallet', (walletQuery) => {
        walletQuery.where('user_id', userId)
      })
      .first()

    if (!address) {
      return response.notFound()
    }

    return address
  }

  async import({ auth, request, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    const userId = auth.user.id

    const data: {
      walletId: string
      addresses: Address[]
    } = request.only(['addresses', 'walletId'])

    if (!data.walletId || !data.addresses) {
      return response.status(400).send('Invalid request')
    }

    const wallet = await Wallet.query().where('id', data.walletId).where('user_id', userId).first()

    if (!wallet || wallet.userId !== userId) {
      return response.unauthorized()
    }

    const addresses = await WalletAddress.createMany(
      data.addresses.map((address) => ({ ...address, walletId: data.walletId }))
    )

    return addresses
  }
}
