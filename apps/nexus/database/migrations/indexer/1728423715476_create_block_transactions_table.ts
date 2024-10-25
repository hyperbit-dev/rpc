import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'block_transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('block_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('blocks')
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
      table.bigInteger('time').unsigned().notNullable() // Timestamp of when the transaction was included in the block

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
