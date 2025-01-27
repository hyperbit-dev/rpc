import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import db from '@adonisjs/lucid/services/db'

const WALLET_LIMIT = 3

export default class WalletPolicy extends BasePolicy {
  async create(user: User, blockchainId: string): Promise<AuthorizerResponse> {
    const wallets = await db
      .from('wallets')
      .where('user_id', '=', user.id)
      .where('blockchain_id', '=', blockchainId)
    if (wallets.length >= WALLET_LIMIT) {
      return false
    }

    return true
  }
}
