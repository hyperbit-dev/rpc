import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

export default class AuthAccessToken extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tokenable_id: string

  @column()
  declare type: string

  @column()
  declare name: string

  @column()
  declare hash: string

  @column()
  declare abilities: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare last_used_at: DateTime

  @column.dateTime()
  declare expires_at: DateTime

  @beforeCreate()
  static assignUuid(model: AuthAccessToken) {
    model.tokenable_id = uuidv4()
  }
}
