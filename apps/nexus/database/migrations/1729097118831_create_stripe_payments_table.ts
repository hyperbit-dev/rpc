import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stripe_payments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.uuid('organization_id').notNullable().references('id').inTable('organizations')
      table.string('stripe_payment_intent_id').notNullable() // Stripe Payment Intent ID
      table.decimal('amount', 10, 2) // Payment amount
      table.string('status') // succeeded, failed, pending
      table.timestamp('payment_date')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}