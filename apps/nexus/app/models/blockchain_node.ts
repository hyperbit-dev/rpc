import { DateTime } from 'luxon'
import { BaseModel, afterFind, beforeSave, belongsTo, column } from '@adonisjs/lucid/orm'
import { Encryption } from '@adonisjs/core/encryption'
import Blockchain from './blockchain.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

// Loose but constant encryption. Values should be encrypted on the client before submission.
// This is just as a second gate in front of raw SQL queries.
const encryption = new Encryption({
  secret: 'blockchain_node_secret',
})

export default class BlockchainNode extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare label: string

  @column()
  declare host: string

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  declare userId: string

  @column()
  declare blockchainId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async encryptPassword(model: BlockchainNode) {
    model.username = (await encryption.encrypt(model.username)) ?? model.username
    model.password = (await encryption.encrypt(model.password)) ?? model.password
  }

  @afterFind()
  static async decriptPassword(model: BlockchainNode) {
    model.username = (await encryption.decrypt(model.username)) ?? model.username
    model.password = (await encryption.decrypt(model.password)) ?? model.password
  }

  @belongsTo(() => Blockchain, {
    foreignKey: 'blockchainId',
  })
  declare blockchain: BelongsTo<typeof Blockchain>
}
