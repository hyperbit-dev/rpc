import type { HttpContext } from '@adonisjs/core/http'
import Organization from '#models/organization'
import StripeSubscription from '#models/stripe_subscription'
import Stripe from 'stripe'

export default class StripeSubscriptionsController {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  /**
   * @swagger
   *  x-hidden: true
   */
  public async create({ request, auth }: HttpContext) {
    const user = await auth.authenticate()
    const organization = await Organization.query()
      .preload('owner')
      .where('ownerId', user.id)
      .firstOrFail()
    // TODO validation for planType
    const { planType } = request.only(['planType'])

    // Create Stripe Customer if not exists
    if (!organization.stripeCustomerId) {
      const customer = await this.stripe.customers.create({
        email: organization.owner.email,
      })
      organization.stripeCustomerId = customer.id
      await organization.save()
    }

    // Create Stripe Subscription
    const subscription = await this.stripe.subscriptions.create({
      customer: organization.stripeCustomerId,
      items: [{ price: planType }],
    })

    // Save subscription to database
    await StripeSubscription.create({
      organizationId: organization.id,
      stripeSubscriptionId: subscription.id,
      planType,
      status: subscription.status,
      startDate: new Date(subscription.start_date * 1000),
      billingCycle: 'monthly',
    })

    return { subscription }
  }

  public async changePlan({ request, auth }: HttpContext) {
    const user = await auth.authenticate()
    const organization = await Organization.query()
      .preload('owner')
      .where('ownerId', user.id)
      .firstOrFail()
    const { newPlanType } = request.only(['newPlanType']) // New plan price ID

    const subscription = await StripeSubscription.query()
      .where('organization_id', organization.id)
      .andWhere('status', 'active')
      .firstOrFail()

    // Update Stripe subscription to the new plan
    const updatedSubscription = await this.stripe.subscriptions.update(
      subscription.stripeSubscriptionId,
      {
        items: [
          {
            id: subscription.stripeSubscriptionId, // Replace with the correct subscription item ID
            price: newPlanType, // New price ID
          },
        ],
        proration_behavior: 'create_prorations',
      }
    )

    // Update subscription details in the database
    subscription.merge({
      planType: newPlanType,
      status: updatedSubscription.status,
    })
    await subscription.save()

    return { updatedSubscription }
  }

  public async cancel({ auth }: HttpContext) {
    const user = await auth.authenticate()
    const organization = await Organization.query()
      .preload('owner')
      .where('ownerId', user.id)
      .firstOrFail()

    const subscription = await StripeSubscription.query()
      .where('organization_id', organization.id)
      .andWhere('status', 'active')
      .firstOrFail()

    // Cancel the subscription on Stripe
    const canceledSubscription = await this.stripe.subscriptions.cancel(
      subscription.stripeSubscriptionId
    )

    // Update the subscription status in the database
    subscription.merge({
      status: 'canceled',
      endDate: canceledSubscription.ended_at
        ? new Date(canceledSubscription.ended_at * 1000)
        : null,
    })
    await subscription.save()

    return { message: 'Subscription canceled', canceledSubscription }
  }

  public async createWithTrial({ request, auth }: HttpContext) {
    const user = await auth.authenticate()
    const organization = await Organization.query()
      .preload('owner')
      .where('ownerId', user.id)
      .firstOrFail()
    const { planType, trialDays } = request.only(['planType', 'trialDays']) // trialDays in days

    // Create Stripe Customer if not exists
    if (!organization.stripeCustomerId) {
      const customer = await this.stripe.customers.create({
        email: organization.owner.email,
      })
      organization.stripeCustomerId = customer.id
      await organization.save()
    }

    // Create a subscription with a trial period
    const subscription = await this.stripe.subscriptions.create({
      customer: organization.stripeCustomerId,
      items: [{ price: planType }],
      trial_period_days: trialDays, // Specify trial days here
    })

    // Save subscription to the database
    await StripeSubscription.create({
      organizationId: organization.id,
      stripeSubscriptionId: subscription.id,
      planType,
      status: subscription.status,
      startDate: new Date(subscription.start_date * 1000),
      trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
      billingCycle: 'monthly',
    })

    return { subscription }
  }
}
