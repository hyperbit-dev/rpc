import { BaseModel, beforeCreate, belongsTo, column, hasMany, hasManyThrough } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasManyThrough } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import Wallet from './wallet.js'
import WalletUser from './wallet_user.js'

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

  @hasManyThrough([() => WalletUser, () => Wallet])
  declare users: HasManyThrough<typeof WalletUser>
}
