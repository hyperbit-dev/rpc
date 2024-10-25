import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stripe_webhooks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.string('stripe_event_id').notNullable() // Stripe event ID
      table.string('event_type') // payment_intent.succeeded, customer.subscription.updated, etc.
      table.boolean('processed').defaultTo(false) // Whether the webhook has been processed
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
