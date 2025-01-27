import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'mempool_transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('txid').notNullable().unique().index()
      table.timestamp('received_timestamp').notNullable()
      table.integer('size').notNullable()
      table.bigInteger('fee').notNullable()
      table.float('priority').nullable()
      table.text('raw_hex').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
