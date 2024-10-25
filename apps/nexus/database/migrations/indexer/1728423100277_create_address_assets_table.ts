import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'address_assets'

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
        .integer('asset_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('assets')
        .onDelete('CASCADE')
        .index()
      table.decimal('amount', 40, 8).notNullable() // Amount of the asset held by the address

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
