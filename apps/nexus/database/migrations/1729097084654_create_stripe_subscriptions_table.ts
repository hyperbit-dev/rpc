import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stripe_subscriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.uuid('organization_id').notNullable().references('id').inTable('organizations')
      table.string('stripe_subscription_id').notNullable() // Stripe Subscription ID
      table.string('plan_type') // free, pro, enterprise
      table.timestamp('grace_period_ends_at').nullable() // End of the grace period
      table.string('status') // active, canceled, grace, past_due, etc.
      table.timestamp('start_date')
      table.timestamp('end_date').nullable() // Can be null for ongoing
      table.string('billing_cycle') // monthly, yearly, etc.
      table.timestamp('trial_end').nullable() // End of trial period
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
