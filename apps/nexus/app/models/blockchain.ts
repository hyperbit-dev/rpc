import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import Wallet from './wallet.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import WalletAddress from './wallet_address.js'
import BlockchainNode from './blockchain_node.js'

export default class Blockchain extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare network: 'mainnet' | 'testnet' | 'regtest'

  @column()
  declare symbol: string

  @column()
  declare externalChainId: string

  @column({ serialize: Boolean })
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

  @hasMany(() => WalletAddress)
  declare addresses: HasMany<typeof WalletAddress>
}
