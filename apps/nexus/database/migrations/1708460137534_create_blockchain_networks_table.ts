import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blockchain_networks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.enu('name', ['mainnet', 'testnet', 'regtest']).notNullable()
      table.uuid('blockchain_id').notNullable().references('id').inTable('blockchains')
      table.string('chain_id').notNullable()
      table.boolean('active').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
