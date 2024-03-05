import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Wallet from './wallet.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import WalletAccountAddress from './wallet_account_address.js'

export default class WalletAccount extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare index: string

  @column()
  declare label: string

  @column()
  declare walletId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(model: WalletAccount) {
    model.id = uuidv4()
  }

  @belongsTo(() => Wallet, {
    foreignKey: 'walletId',
  })
  declare wallet: BelongsTo<typeof Wallet>

  @hasMany(() => WalletAccountAddress)
  declare addresses: HasMany<typeof WalletAccountAddress>
}
