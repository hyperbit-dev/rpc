import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class TransactionVin extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare transactionId: string

  @column()
  declare txid: string

  @column()
  declare vout?: number

  @column()
  declare coinbase?: string

  @column()
  declare sequence: number

  @column()
  declare scriptSigAsm?: string

  @column()
  declare scriptSigHex?: string

  @column()
  declare address?: string

  @column()
  declare value?: number

  @column()
  declare valueSat?: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
