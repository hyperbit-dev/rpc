import type { HttpContext } from '@adonisjs/core/http'
import StripePayment from '#models/stripe_payment'

export default class StripePaymentsController {
  public async list({ auth }: HttpContext) {
    const user = await auth.authenticate()
    const payments = await StripePayment.query().where('user_id', user.id)
    return payments
  }
}
