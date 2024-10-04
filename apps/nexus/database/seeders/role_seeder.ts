import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const roles = [
      {
        id: 'fd3147ce-0e7d-43e2-8912-13debffed722',
        name: 'admin',
        description: 'Full control over all aspects of the system',
      },
      {
        id: '82d6c7c0-8989-43a4-aafa-bde644a8fb24',
        name: 'manager',
        description: 'Manage wallets, addresses, transactions, view details, access reports',
      },
      {
        id: 'ad4e2ef5-d15a-4fa8-9f9b-45744a4d817d',
        name: 'user',
        description: 'View wallets, addresses, transactions',
      },
      {
        id: 'ffb217c6-593c-4832-86e8-d0b53aa5914f',
        name: 'viewer',
        description: 'View wallets, addresses, transactions',
      },
      {
        id: 'c1c25f81-c828-44b1-a80a-4f3ffc6c5fbe',
        name: 'support',
        description: 'View only support access',
      },
    ]

    await Role.updateOrCreateMany('name', roles)
  }
}
