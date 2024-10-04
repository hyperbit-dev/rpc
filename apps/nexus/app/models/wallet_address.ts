import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import Wallet from './wallet.js'

export default class WalletAddress extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare address: string

  @column()
  declare label?: string

  @column()
  declare path: string

  @column()
  declare walletId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(model: WalletAddress) {
    model.id = uuidv4()
  }

  @belongsTo(() => Wallet, {
    foreignKey: 'walletId',
  })
  declare wallet: BelongsTo<typeof Wallet>
}
