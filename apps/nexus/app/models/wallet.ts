import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Blockchain from './blockchain.js'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import WalletAddress from './wallet_address.js'
import BlockchainNetwork from './blockchain_network.js'

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
  declare networkId: string

  @column()
  declare userId: string

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

  @belongsTo(() => BlockchainNetwork, {
    foreignKey: 'networkId',
  })
  declare network: BelongsTo<typeof BlockchainNetwork>

  @hasMany(() => WalletAddress)
  declare addresses: HasMany<typeof WalletAddress>
}
