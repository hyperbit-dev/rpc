import type { HttpContext } from '@adonisjs/core/http'
import StripeSubscription from '#models/stripe_subscription'
import StripeWebhook from '#models/stripe_webhook'
import Stripe from 'stripe'
import { DateTime } from 'luxon'

export default class StripeWebhooksController {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  public async handle({ request }: HttpContext) {
    const signature = request.header('stripe-signature')
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event

    try {
      if (!signature || !webhookSecret) {
        return { error: 'Missing signature or webhook secret' }
      }
      const rawBody = request.raw()
      if (!rawBody) {
        return { error: 'Invalid request body' }
      }
      event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
    } catch (err) {
      return { error: 'Invalid signature' }
    }

    // Save event to database
    await StripeWebhook.create({
      stripeEventId: event.id,
      eventType: event.type,
      processed: false,
    })

    switch (event.type) {
      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice)
        break
      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
    }

    return { received: true }
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    const subscription = await StripeSubscription.findBy(
      'stripe_subscription_id',
      invoice.subscription
    )

    if (subscription) {
      const gracePeriodEndsAt = new Date()
      gracePeriodEndsAt.setDate(gracePeriodEndsAt.getDate() + 7) // Add a 7-day grace period

      subscription.status = 'grace'
      subscription.gracePeriodEndsAt = DateTime.fromJSDate(gracePeriodEndsAt)
      await subscription.save()

      await this.notifyUserAboutFailedPayment(subscription)
    }
  }

  private async handleSubscriptionUpdated(subscriptionObj: Stripe.Subscription) {
    const subscription = await StripeSubscription.findBy(
      'stripe_subscription_id',
      subscriptionObj.id
    )

    if (subscription) {
      subscription.status = subscriptionObj.status === 'active' ? 'active' : 'grace'
      subscription.gracePeriodEndsAt = null // Clear grace period if the subscription is back to active
      await subscription.save()
    }

    // TODO Email logic, push notifications, etc.
  }

  private async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    const subscription = await StripeSubscription.findBy(
      'stripe_subscription_id',
      invoice.subscription
    )

    if (subscription) {
      subscription.status = 'active'
      subscription.gracePeriodEndsAt = null // Clear grace period on successful payment
      await subscription.save()

      // Notify the user that their payment was successful
      await this.notifyUserAboutSuccessfulPayment(subscription)
    }
  }

  private async handleSubscriptionDeleted(subscriptionObj: Stripe.Subscription) {
    const subscription = await StripeSubscription.findBy(
      'stripe_subscription_id',
      subscriptionObj.id
    )

    if (subscription) {
      subscription.status = 'canceled'
      subscription.gracePeriodEndsAt = null
      await subscription.save()

      // Notify the user that their subscription was canceled
      await this.notifyUserAboutSubscriptionCancellation(subscription)
    }
  }

  private async notifyUserAboutFailedPayment(_subscription: StripeSubscription) {
    // Send an email notification to the user reminding them to update their payment details
    // Implement email notification logic here...
  }

  private async notifyUserAboutSuccessfulPayment(_subscription: StripeSubscription) {
    // Implement email or notification logic to inform the user about payment success
  }

  private async notifyUserAboutSubscriptionCancellation(_subscription: StripeSubscription) {
    // Implement email or notification logic to inform the user about subscription cancellation
  }
}
