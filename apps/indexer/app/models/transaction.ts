import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare txid: string

  @column()
  declare hash: string

  @column()
  declare version: number

  @column()
  declare size: number

  @column()
  declare vsize: number

  @column()
  declare locktime: number

  @column()
  declare hex: string

  @column()
  declare blockId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
