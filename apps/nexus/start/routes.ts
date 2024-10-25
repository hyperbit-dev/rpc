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
const StripeSubscriptionsController = () => import('#controllers/stripe_subscriptions_controller')
const StripePaymentsController = () => import('#controllers/stripe_payments_controller')
const StripeWebhooksController = () => import('#controllers/stripe_webhooks_controller')
const AddressesController = () => import('#controllers/addresses_controller')
const BlockchainsController = () => import('#controllers/blockchains_controller')
// const IndexersController = () => import('#controllers/indexers_controller')
const AuthController = () => import('#controllers/auth_controller')
const WalletsController = () => import('#controllers/wallets_controller')

router
  .group(() => {
    // Auth Service
    router
      .group(() => {
        router.post('login', [AuthController, 'login'])
        router.post('logout', [AuthController, 'logout'])
        router.post('register', [AuthController, 'register'])
        router.post('verify/:token', [AuthController, 'verifyEmail'])
        // router.post('reset', [AuthController, 'reset'])
        // router.post('reset/verify', [AuthController, 'resetVerify'])
        router.post('/:provider', [AuthController, 'provider']).where('provider', /google/)

        router
          .group(() => {
            router.get('/sessions', [AuthController, 'getSessions'])
          })
          .use(
            middleware.auth({
              guards: ['api'],
            })
          )
      })
      .prefix('auth')

    // Blockchain Indexer Service
    // router
    //   .group(() => {
    //     router
    //       .group(() => {
    //         router.post('/blockchains/:symbol/notify/:action', [IndexersController, 'notify'])
    //       })
    //       .prefix('indexer')
    //   })
    //   .prefix('v1/internal')

    router
      .group(() => {
        // Billing Service
        router
          .group(() => {
            router.post('subscriptions/create', [StripeSubscriptionsController, 'create'])
            router.post('subscriptions/create-with-trial', [
              StripeSubscriptionsController,
              'createWithTrial',
            ])
            router.post('subscriptions/change-plan', [StripeSubscriptionsController, 'changePlan'])
            router.post('subscriptions/cancel', [StripeSubscriptionsController, 'cancel'])
            router.get('payments', [StripePaymentsController, 'list'])
            router.post('webhooks/stripe', [StripeWebhooksController, 'handle'])
          })
          .prefix('billing')

        // Wallets Service
        router
          .group(() => {
            router.get('/', [WalletsController, 'listWallets'])
            router.get('/:id', [WalletsController, 'getWallet'])
            router.get('/:id/balance', [WalletsController, 'getWalletBalance'])
            router.post('/', [WalletsController, 'createWallet'])
          })
          .prefix('wallets')

        // Blockchain Service
        router
          .group(() => {
            router.get('/', [BlockchainsController, 'getAll'])
            router.post('/:symbol/rpc/:method', [BlockchainsController, 'rpcMethodRequest'])
            router.post('/:symbol/rpc/', [BlockchainsController, 'rpcRawRequest'])
            router.get('/:id', [BlockchainsController, 'getSingle'])
          })
          .prefix('blockchains')
          .use(middleware.apiLogger())

        router.get('addresses', [AddressesController, 'getAll'])
        router.get('addresses/:id', [AddressesController, 'getSingle'])
        router.post('addresses/import', [AddressesController, 'import'])
      })
      .prefix('v1')
      .use(middleware.ensureEmailVerified())
      .use(
        middleware.auth({
          guards: ['api'],
        })
      )
  })
  .prefix('api')
  .use(throttle)
