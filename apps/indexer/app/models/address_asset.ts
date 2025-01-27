import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AddressAsset extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare address: string

  @column()
  declare asset: string

  @column()
  declare amount?: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
