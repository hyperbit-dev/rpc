import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

export default class Block extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare hash: string

  @column()
  declare strippedsize: number

  @column()
  declare size: number

  @column()
  declare weight: number

  @column()
  declare height: number

  @column()
  declare version: number

  @column()
  declare versionHex: string

  @column()
  declare merkleroot: string

  @column()
  declare time: number

  @column()
  declare mediantime: number

  @column()
  declare nonce: number

  @column()
  declare bits: string

  @column()
  declare difficulty: number

  @column()
  declare chainwork: string

  @column()
  declare headerhash: string

  @column()
  declare mixhash: string

  @column()
  declare nonce64?: number

  @column()
  declare previousblockhash?: string

  @column()
  declare nextblockhash?: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(model: Block) {
    model.id = uuidv4()
  }
}
