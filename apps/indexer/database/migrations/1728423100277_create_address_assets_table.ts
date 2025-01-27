import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'address_assets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.string('address').notNullable().index()
      table.string('asset').notNullable().index()
      table.decimal('amount', 65, 18).nullable() // Amount of the asset held by the address

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
