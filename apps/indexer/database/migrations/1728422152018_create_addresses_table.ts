import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.string('address').notNullable().unique().index() // Unique address with index for faster queries
      table.bigInteger('received').notNullable().defaultTo(0) // Total amount received by the address
      table.bigInteger('balance').notNullable().defaultTo(0) // Current balance of the address
      table.integer('transaction_count').unsigned().notNullable().defaultTo(0) // Total number of transactions sent to the address
      table.bigInteger('last_seen').unsigned().notNullable().defaultTo(0) // Timestamp for the last transaction involving this address

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
