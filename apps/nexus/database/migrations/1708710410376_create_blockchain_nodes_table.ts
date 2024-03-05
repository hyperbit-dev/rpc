import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blockchain_nodes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.string('label')
      table.string('host')
      table.string('username')
      table.string('password')
      table.uuid('user_id').notNullable().references('id').inTable('users')
      table.uuid('blockchain_id').notNullable().references('id').inTable('blockchains')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}