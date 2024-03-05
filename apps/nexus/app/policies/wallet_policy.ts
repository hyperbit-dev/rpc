import User from '#models/user'
import UserSetting from '#models/user_setting'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import db from '@adonisjs/lucid/services/db'

export default class WalletPolicy extends BasePolicy {
  async create(user: User, chainId: string): Promise<AuthorizerResponse> {
    const wallets = await db
      .from('wallets')
      .join('blockchains', (query) => {
        query
          .on('wallets.blockchain_id', '=', 'blockchains.id')
          .andOnVal('blockchains.chain_id', '=', chainId)
      })
      .select('wallets.*')

    let userSetting = await UserSetting.findBy('user_id', user.id)
    let walletLimit: string | number = 3

    if (!userSetting) {
      userSetting = new UserSetting()
      userSetting.settings = {
        blockchains: {
          [chainId]: {
            walletLimit: 5,
          },
        },
      }
    } else {
      walletLimit = userSetting.settings?.blockchains?.[chainId]?.walletLimit
      if (!walletLimit) {
        userSetting.settings.blockchains = {
          ...userSetting.settings.blockchains,
          [chainId]: {
            ...userSetting.settings.blockchains[chainId],
            walletLimit: 5,
          },
        }
      }
    }
    userSetting.userId = user.id
    if (typeof userSetting.settings !== 'string') {
      // @ts-ignore
      userSetting.settings = JSON.stringify(userSetting.settings)
    }
    await userSetting.save()
    if (wallets.length >= Number(walletLimit)) {
      return false
    }

    return true
  }
}
