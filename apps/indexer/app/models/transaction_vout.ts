import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class TransactionVout extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare transactionId: string

  @column()
  declare txid: string

  @column()
  declare n: number

  @column()
  declare value: number

  @column()
  declare valueSat: number

  @column()
  declare scriptPubKeyAsm: string

  @column()
  declare scriptPubKeyHex: string

  @column()
  declare scriptPubKeyReqSigs: number

  @column()
  declare scriptPubKeyType: string

  @column()
  declare scriptPubKeyAddresses: string

  @column()
  declare scriptPubKeyAssetName?: string

  @column()
  declare scriptPubKeyAssetAmount?: number

  @column()
  declare scriptPubKeyAssetExpireTime?: number

  @column()
  declare scriptPubKeyAssetUnits?: number

  @column()
  declare scriptPubKeyAssetReissuable?: number

  @column()
  declare scriptPubKeyAssetIpfsHash?: number

  @column()
  declare spentTxid?: number

  @column()
  declare spentIndex?: number

  @column()
  declare spentHeight?: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
