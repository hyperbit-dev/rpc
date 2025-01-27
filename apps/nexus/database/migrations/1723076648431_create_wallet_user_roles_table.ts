import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wallet_user_roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.uuid('wallet_id').notNullable().references('id').inTable('wallets')
      table.uuid('user_id').notNullable().references('id').inTable('users')
      table.uuid('wallet_role_id').notNullable().references('id').inTable('wallet_roles')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
