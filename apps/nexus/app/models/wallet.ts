import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
  hasManyThrough,
} from '@adonisjs/lucid/orm'
import Blockchain from './blockchain.js'
import type { BelongsTo, HasMany, HasManyThrough } from '@adonisjs/lucid/types/relations'
import WalletAccount from './wallet_account.js'
import WalletAccountAddress from './wallet_account_address.js'

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
  declare favorite: boolean

  @column()
  declare creationType: 'CREATE' | 'IMPORT'

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

  @hasMany(() => WalletAccount)
  declare accounts: HasMany<typeof WalletAccount>

  @hasManyThrough([() => WalletAccountAddress, () => WalletAccount])
  declare addresses: HasManyThrough<typeof WalletAccountAddress>
}
