import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('address').notNullable().unique().index() // Unique address with index for faster queries
      table.decimal('received', 18, 8).notNullable().defaultTo(0) // Total amount received by the address
      table.decimal('balance', 18, 8).notNullable().defaultTo(0) // Current balance of the address

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
