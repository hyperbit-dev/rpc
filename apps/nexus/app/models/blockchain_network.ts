import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import Blockchain from './blockchain.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class BlockchainNetwork extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare blockchainId: string

  @column()
  declare chainId: string

  @column()
  declare name: 'mainnet' | 'testnet' | 'regtest'

  @column()
  declare active: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(model: BlockchainNetwork) {
    model.id = uuidv4()
  }

  @belongsTo(() => Blockchain, {
    foreignKey: 'blockchainId',
  })
  declare blockchain: BelongsTo<typeof Blockchain>
}
