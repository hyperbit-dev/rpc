import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wallet_account_addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.string('address')
      table.string('label')
      table.string('path')
      table.enu('type', ['EXTERNAL', 'CHANGE']).notNullable()
      table.uuid('wallet_account_id').notNullable().references('id').inTable('wallet_accounts')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
