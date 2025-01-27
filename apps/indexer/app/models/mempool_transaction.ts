import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MempoolTransaction extends BaseModel {
  @column()
  declare txid: string

  @column()
  declare receivedTimestamp: DateTime

  @column()
  declare size: number

  @column()
  declare fee: bigint

  @column()
  declare priority?: number

  @column()
  declare rawHex?: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
