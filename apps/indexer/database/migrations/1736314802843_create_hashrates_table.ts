import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'hashrates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table
        .uuid('block_id')
        .notNullable()
        .unique()
        .references('id')
        .inTable('blocks')
        .onDelete('CASCADE')
      table.decimal('hashrate', 65, 18).notNullable() // Hashrate in H/s
      table.integer('time').index().unsigned().notNullable() // Unix timestamp
      table.timestamp('calculated_at').defaultTo(this.now()) // Timestamp when the hashrate was calculated
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
