import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

export default class UserSetting extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare settings: Settings | string

  @column({columnName: 'user_id'})
  declare userId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(model: UserSetting) {
    model.id = uuidv4()
  }
}

type Settings = {
  blockchains: {
    [x: string]: {
      walletLimit: number | string
    }
  }
}
