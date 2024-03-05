import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import WalletAccount from './wallet_account.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class WalletAccountAddress extends BaseModel {
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
  declare type: 'EXTERNAL' | 'CHANGE'

  @column()
  declare walletAccountId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(model: WalletAccountAddress) {
    model.id = uuidv4()
  }

  @belongsTo(() => WalletAccount, {
    foreignKey: 'walletAccountId',
  })
  declare account: BelongsTo<typeof WalletAccount>
}
