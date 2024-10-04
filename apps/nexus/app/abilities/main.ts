/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import User from '#models/user'
import Wallet from '#models/wallet'
import { Bouncer } from '@adonisjs/bouncer'

/**
 * Delete the following ability to start from
 * scratch
 */
export const editUser = Bouncer.ability(() => {
  return true
})

export const createWallet = Bouncer.ability((_: User, blockchainId: string, wallets: Wallet[]) => {
  const count = wallets.reduce((acc, w) => {
    if (w.blockchainId === blockchainId) {
      acc++
    }
    return acc
  }, 0)
  return count < 3
})
