import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organization_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.uuid('organization_id').notNullable().references('id').inTable('organizations')
      table.uuid('user_id').notNullable().references('id').inTable('users')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.alterTable('organization_users', (table) => {
      table.unique(['organization_id', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
