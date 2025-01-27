import OrganizationRole from '#models/organization_role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const roles = [
      {
        id: 'fd3147ce-0e7d-43e2-8912-13debffed722',
        name: 'owner',
        description: 'Full control over all aspects of the system',
      },
      {
        id: 'ad4e2ef5-d15a-4fa8-9f9b-45744a4d817d',
        name: 'user',
        description: 'Part of the organization',
      },
      {
        id: 'c1c25f81-c828-44b1-a80a-4f3ffc6c5fbe',
        name: 'support',
        description: 'View organization data',
      },
    ]

    await OrganizationRole.updateOrCreateMany('name', roles)
  }
}
