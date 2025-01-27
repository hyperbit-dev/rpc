import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Hashrate extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare blockId: string

  @column()
  declare hashrate: number

  @column()
  declare time: number

  @column.dateTime()
  declare calculatedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
