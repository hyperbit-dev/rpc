import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wallet_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.uuid('wallet_id').notNullable().references('id').inTable('wallets')
      table.uuid('user_id').notNullable().references('id').inTable('users')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.alterTable('wallet_users', (table) => {
      table.unique(['wallet_id', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
