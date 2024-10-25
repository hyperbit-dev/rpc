import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'address_transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Primary key
      table
        .integer('address_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('addresses')
        .onDelete('CASCADE')
        .index()
      table
        .integer('transaction_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('transactions')
        .onDelete('CASCADE')
        .index()
      table.bigInteger('time').unsigned().notNullable() // Transaction timestamp

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
