import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, column, hasMany, hasManyThrough } from '@adonisjs/lucid/orm'
import Wallet from './wallet.js'
import type { HasMany, HasManyThrough } from '@adonisjs/lucid/types/relations'
import WalletAccountAddress from './wallet_account_address.js'
import WalletAccount from './wallet_account.js'
import BlockchainNode from './blockchain_node.js'

export default class Blockchain extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare chainId: string

  @column()
  declare name: string

  @column()
  declare symbol: string

  @column()
  declare network: 'MAINNET' | 'TESTNET' | 'REGTEST'

  @column()
  declare active: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(model: Blockchain) {
    model.id = uuidv4()
  }

  @hasMany(() => Wallet)
  declare wallets: HasMany<typeof Wallet>

  @hasMany(() => BlockchainNode)
  declare nodes: HasMany<typeof BlockchainNode>

  @hasMany(() => WalletAccount)
  declare accounts: HasMany<typeof WalletAccount>

  @hasManyThrough([() => WalletAccountAddress, () => Wallet])
  declare addresses: HasManyThrough<typeof WalletAccountAddress>
}
