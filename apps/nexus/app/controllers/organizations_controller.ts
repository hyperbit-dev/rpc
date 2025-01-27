import Organization from '#models/organization'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrganizationsController {
  /**
   * @index
   * @description List all organizations belonging to the authenticated user
   * @responseBody 200 - <Organization[]>.exclude(stripe_customer_id)
   */
  async index({ auth, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    return Organization.query()
      .whereHas('users', (query) => {
        query.where('user_id', auth.user!.id)
      })
      .select('id', 'name', 'ownerId')
  }

  /**
   * @patch
   * @description Update an organization
   * @requestBody {"name": "string"}
   * @responseBody 200 - <Organization>.exclude(stripe_customer_id)
   */
  async patch({ auth, request, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    const organization = await Organization.findOrFail(request.param('id'))

    if (organization.ownerId !== auth.user.id) {
      return response.unauthorized()
    }

    organization.merge(request.only(['name']))
    await organization.save()

    return organization
  }
}
