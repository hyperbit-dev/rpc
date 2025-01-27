import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Blockchain from './blockchain.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import WalletAddress from './wallet_address.js'
import WalletUser from './wallet_user.js'

export default class Wallet extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare externalId: string

  @column()
  declare label: string

  @column()
  declare blockchainId: string

  @column()
  declare userId: string

  @column()
  declare encryptionKey: string

  @column()
  declare favorite: boolean

  @column()
  declare type: 'hot' | 'cold' | 'custodial'

  @column()
  declare lockedAt?: DateTime

  @column()
  declare archivedAt?: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(model: Wallet) {
    model.id = uuidv4()
  }

  @belongsTo(() => Blockchain, {
    foreignKey: 'blockchainId',
  })
  declare blockchain: BelongsTo<typeof Blockchain>

  @hasMany(() => WalletAddress)
  declare addresses: HasMany<typeof WalletAddress>

  @hasMany(() => WalletUser)
  declare users: HasMany<typeof WalletUser>
}
