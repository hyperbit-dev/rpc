import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blocks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary()
      table.string('hash').notNullable().unique().index()
      table.integer('strippedsize').unsigned().notNullable()
      table.integer('size').unsigned().notNullable()
      table.integer('weight').unsigned().notNullable()
      table.bigInteger('height').unsigned().notNullable().index()
      table.bigInteger('version').unsigned().notNullable()
      table.string('versionHex').notNullable()
      table.string('merkleroot').notNullable()
      table.integer('time').unsigned().notNullable() // Unix timestamp
      table.integer('mediantime').unsigned().notNullable() // Unix timestamp
      table.bigInteger('nonce').unsigned().notNullable()
      table.string('bits').notNullable()
      table.float('difficulty').notNullable()
      table.string('chainwork').notNullable()
      table.string('headerhash').notNullable()
      table.string('mixhash').notNullable()
      table.bigInteger('nonce64').unsigned().notNullable()
      table.string('previousblockhash').nullable().index() // Nullable to account for the genesis block
      table.string('nextblockhash').nullable().index() // Nullable for the latest block

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
