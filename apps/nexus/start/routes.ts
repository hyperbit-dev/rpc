/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import WalletsController from '#controllers/wallets_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import BlockchainNodesController from '#controllers/blockchain_nodes_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('login', [AuthController, 'login'])
        router.post('logout', [AuthController, 'logout'])
        router.post('register', [AuthController, 'register'])
        router.post('reset', [AuthController, 'reset'])
        router.post('reset/verify', [AuthController, 'resetVerify'])
      })
      .prefix('auth')
    router
      .group(() => {
        router.get('wallets', [WalletsController, 'index'])
        router.post('wallets', [WalletsController, 'create'])
        router.group(() => {
          router.get('nodes', [BlockchainNodesController, 'index'])
        }).prefix('blockchains')
      })
      .prefix('v1')
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api')