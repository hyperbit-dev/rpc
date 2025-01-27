import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blockchain_state'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('key').primary()
      table.text('value').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
