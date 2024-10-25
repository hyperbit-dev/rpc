import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Primary key
      table.string('txid').notNullable().unique().index()
      table.string('hash').notNullable().index()
      table.integer('version').unsigned().notNullable()
      table.integer('size').unsigned().notNullable()
      table.integer('vsize').unsigned().notNullable()
      table.integer('locktime').unsigned().notNullable()
      table.json('vin').notNullable() // JSON for multiple inputs
      table.json('vout').notNullable() // JSON for multiple outputs
      table.text('hex').notNullable() // Raw transaction data
      table.string('blockhash').notNullable().index()
      table.integer('height').unsigned().notNullable().index()
      table.integer('time').unsigned().notNullable() // Unix timestamp for transaction
      table.integer('blocktime').unsigned().notNullable() // Unix timestamp for block

      // Foreign key to the blocks table
      table.integer('block_id').unsigned().references('id').inTable('blocks').onDelete('CASCADE') // If a block is deleted, its transactions are deleted

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
