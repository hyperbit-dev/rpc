/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { throttle } from './limiter.js'
const AddressesController = () => import('#controllers/addresses_controller')
const BlockchainsController = () => import('#controllers/blockchains_controller')
const AuthController = () => import('#controllers/auth_controller')
const WalletsController = () => import('#controllers/wallets_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('login', [AuthController, 'login'])
        router.post('logout', [AuthController, 'logout'])
        router.post('register', [AuthController, 'register'])
        // router.post('reset', [AuthController, 'reset'])
        // router.post('reset/verify', [AuthController, 'resetVerify'])
        router.post('/:provider', [AuthController, 'provider']).where('provider', /google/)
      })
      .prefix('auth')

    router
      .group(() => {
        // Wallets Service
        router
          .group(() => {
            router.get('/', [WalletsController, 'listWallets'])
            router.get('/:id', [WalletsController, 'getWallet'])
            router.get('/:id/balance', [WalletsController, 'getWalletBalance'])
            router.post('/', [WalletsController, 'createWallet'])
          })
          .prefix('wallets')

        // // Blockchain Service
        router
          .group(() => {
            router.get('/', [BlockchainsController, 'getAll'])
            router.post('/:symbol/rpc', [BlockchainsController, 'rpcRequest'])
            router.get('/:id', [BlockchainsController, 'getSingle'])
          })
          .prefix('blockchains')

        router.get('addresses', [AddressesController, 'getAll'])
        router.get('addresses/:id', [AddressesController, 'getSingle'])
        router.post('addresses/import', [AddressesController, 'import'])
      })
      .prefix('v1')
      .use(
        middleware.auth({
          guards: ['api'],
        })
      )
  })
  .prefix('api')
  .use(throttle)
