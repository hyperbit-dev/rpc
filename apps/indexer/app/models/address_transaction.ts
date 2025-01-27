import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AddressTransaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare address: string

  @column()
  declare txid: string

  @column()
  declare time: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
