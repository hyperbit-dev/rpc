import Organization from '#models/organization'
import Stripe from 'stripe'

export default class StripeService {
  static async createStripeCustomer(organizationId: string) {
    const stripe = new Stripe('sk_test_...')
    const organization = await Organization.query()
      .preload('owner')
      .where('id', organizationId)
      .firstOrFail()

    if (!organization.stripeCustomerId) {
      const customer = await stripe.customers.create({
        name: organization.name,
        email: organization.owner.email,
      })

      organization.stripeCustomerId = customer.id
      await organization.save()
    }

    return { organization }
  }
}
