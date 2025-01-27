import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'address_transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.string('txid').notNullable().index() // Transaction ID
      table.string('address').notNullable().index() // Address
      table.bigInteger('time').unsigned().notNullable().defaultTo(0) // Transaction timestamp

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
