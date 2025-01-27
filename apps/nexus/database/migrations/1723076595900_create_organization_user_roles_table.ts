import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organization_user_roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.uuid('organization_id').notNullable().references('id').inTable('organizations')
      table.uuid('user_id').notNullable().references('id').inTable('users')
      table
        .uuid('organization_role_id')
        .notNullable()
        .references('id')
        .inTable('organization_roles')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
