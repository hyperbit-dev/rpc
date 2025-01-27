/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import { middleware } from './kernel.js'
import { throttle } from './limiter.js'
const StripeSubscriptionsController = () => import('#controllers/stripe_subscriptions_controller')
const StripePaymentsController = () => import('#controllers/stripe_payments_controller')
const StripeWebhooksController = () => import('#controllers/stripe_webhooks_controller')
const AddressesController = () => import('#controllers/addresses_controller')
const BlockchainsController = () => import('#controllers/blockchains_controller')
const OrganizationsController = () => import('#controllers/organizations_controller')
const AuthController = () => import('#controllers/auth_controller')
const WalletsController = () => import('#controllers/wallets_controller')

// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

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
        // router.post('/:provider', [AuthController, 'provider']).where('provider', /google/)

        router
          .group(() => {
            router.get('verify', [AuthController, 'sendVerificationEmail'])
            router.get('/sessions', [AuthController, 'getSessions'])
          })
          .use(
            middleware.auth({
              guards: ['api'],
            })
          )
      })
      .prefix('v1/auth')

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

        // Oranization Service
        router
          .group(() => {
            router.get('/', [OrganizationsController, 'index'])
            router.patch('/:id', [OrganizationsController, 'patch'])
          })
          .prefix('organizations')

        // Wallets Service
        router
          .group(() => {
            router.get('/', [WalletsController, 'index'])
            router.get('/:id', [WalletsController, 'show'])
            router.post('/', [WalletsController, 'createWallet'])
          })
          .prefix('wallets')

        // Blockchain Service
        router
          .group(() => {
            router.get('/', [BlockchainsController, 'index'])
            router.get('/:id', [BlockchainsController, 'show'])
            router.post('/:symbol/rpc/:method', [BlockchainsController, 'rpcMethodRequest'])
            router.post('/:symbol/rpc/', [BlockchainsController, 'rpcRawRequest'])
          })
          .prefix('blockchains')
          .use(middleware.apiLogger())

        router
          .group(() => {
            router.get('/', [AddressesController, 'getAll'])
            router.get('/transactions', [AddressesController, 'transactions'])
            router.get('/receive', [AddressesController, 'getReceiveAddress'])
            router.get('/:id', [AddressesController, 'getSingle'])
            router.post('/import', [AddressesController, 'import'])
          })
          .prefix('addresses')
      })
      .prefix('v1')
      .use(middleware.ensureEmailVerified({ guards: ['api'] }))
      .use(
        middleware.auth({
          guards: ['api'],
        })
      )
  })
  .prefix('api')
  .use(throttle)
