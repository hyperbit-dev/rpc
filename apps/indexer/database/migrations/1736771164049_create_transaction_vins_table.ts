import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction_vins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table
        .uuid('transaction_id')
        .notNullable()
        .references('id')
        .inTable('transactions')
        .onDelete('CASCADE')

      table.string('txid').notNullable()

      table.string('coinbase').nullable()
      table.bigInteger('sequence').nullable()

      table.integer('vout').nullable()
      table.string('script_sig_asm').nullable()
      table.string('script_sig_hex').nullable()

      table.string('address').nullable()
      table.decimal('value', 65, 18).nullable()
      table.bigInteger('value_sat').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
