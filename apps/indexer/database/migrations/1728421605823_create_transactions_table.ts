import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.string('txid').notNullable().unique().index()
      table.string('hash').notNullable().unique().index()
      table.integer('version').unsigned().notNullable()
      table.integer('size').unsigned().notNullable()
      table.integer('vsize').unsigned().notNullable()
      table.integer('locktime').unsigned().notNullable()
      table.text('hex', 'longtext').notNullable()
      // Foreign key to the blocks table
      table.uuid('block_id').notNullable().references('id').inTable('blocks').onDelete('CASCADE') // If a block is deleted, its transactions are deleted

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
