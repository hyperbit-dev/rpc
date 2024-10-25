import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import StripeSubscription from '#models/stripe_subscription'
import Organization from '#models/organization'
import { DateTime } from 'luxon'

export default class StripeSubscriptionMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    const user = await auth.authenticate()
    const organization = await Organization.query().where('ownerId', user.id).firstOrFail()
    const subscription = await StripeSubscription.query()
      .where('organization_id', organization.id)
      .first()

    if (subscription && subscription.status === 'grace') {
      // Allow access during grace period
      if (subscription.gracePeriodEndsAt && subscription.gracePeriodEndsAt > DateTime.now()) {
        await next()
      } else {
        return response.forbidden({
          message: 'Subscription has been canceled due to payment issues',
        })
      }
    } else if (subscription && subscription.status === 'active') {
      // If the subscription is active, proceed
      await next()
    } else {
      return response.forbidden({ message: 'No active subscription found' })
    }

    const output = await next()
    return output
  }
}
