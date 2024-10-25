import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'assets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id'); // Primary key
      table.string('name').notNullable().unique().index(); // Unique asset name (e.g., HYPERBIT)
      table.string('type').notNullable().index()
      table.decimal('amount', 40, 8).notNullable(); // Total amount issued for the asset
      table.integer('units').unsigned().notNullable().defaultTo(0); // Number of decimal units the asset supports (similar to cryptocurrency decimals)
      table.boolean('reissuable').notNullable().defaultTo(true); // Flag to indicate if the asset can be reissued
      table.boolean('has_ipfs').notNullable().defaultTo(false); // Whether the asset has an associated IPFS hash
      table.string('ipfs_hash').nullable(); // Optional IPFS hash (if exists)
      table.json('metadata').nullable() // JSON for additional metadata

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}