import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wallet_addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.string('address').notNullable()
      table.string('label')
      table.string('path')
      table.uuid('wallet_id').notNullable().references('id').inTable('wallets')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.alterTable('wallet_addresses', (table) => {
      table.unique(['address', 'path', 'wallet_id'])
    })
  }

  async down() {
    this.schema.alterTable('wallet_addresses', (table) => {
      table.dropUnique(['address', 'path', 'wallet_id'])
    })
    this.schema.dropTable(this.tableName)
  }
}
