import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blockchains'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      // @hyperbitjs/chains id
      table.string('chain_id').notNullable()
      table.string('name').notNullable()
      table.string('symbol').notNullable()
      table.enu('network', ['MAINNET', 'TESTNET', 'REGTEST']).notNullable()
      table.boolean('active').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
