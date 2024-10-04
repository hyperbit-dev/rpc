import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wallets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.string('external_id').unique()
      table.string('label')
      table.uuid('blockchain_id').notNullable().references('id').inTable('blockchains')
      table.uuid('network_id').notNullable().references('id').inTable('blockchain_networks')
      table.uuid('user_id').notNullable().references('id').inTable('users')
      table.enu('type', ['hot', 'cold', 'custodial']).defaultTo('hot')
      table.boolean('favorite').defaultTo(false)
      table.timestamp('locked_at').nullable()
      table.timestamp('archived_at').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
