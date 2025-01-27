import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction_vouts'

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

      table.integer('n').notNullable()
      table.decimal('value', 65, 18).notNullable()
      // valueSat
      table.bigInteger('value_sat').notNullable().defaultTo(0)
      // scriptPubKey
      table.string('script_pub_key_asm').notNullable()
      table.string('script_pub_key_hex').notNullable()
      // regSigs
      table.string('script_pub_key_req_sigs').nullable()
      table.string('script_pub_key_type').notNullable()

      // array of addresses
      table.string('script_pub_key_addresses').notNullable()

      // asset.name
      table.string('script_pub_key_asset_name').nullable()
      // asset.amount
      table.decimal('script_pub_key_asset_amount', 65, 18).nullable()
      // asset.expire_time
      table.integer('script_pub_key_asset_expire_time').nullable()
      // asset.units
      table.integer('script_pub_key_asset_units').nullable()
      // asset.reissuable
      table.integer('script_pub_key_asset_reissuable').nullable()
      // asset.ipfs_hash
      table.integer('script_pub_key_asset_ipfs_hash').nullable()

      // spentTxId
      table.string('spent_txid').nullable()
      // spentIndex
      table.integer('spent_index').nullable()
      // spentHeight
      table.bigInteger('spent_height').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
