import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Asset extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare assetId: string

  @column()
  declare name: string

  @column()
  declare type: string

  @column()
  declare amount: number

  @column()
  declare expireTime?: number

  @column()
  declare units: number

  @column()
  declare reissuable: boolean

  @column()
  declare hasIpfs: boolean

  @column()
  declare ipfsHash?: string

  @column()
  declare metadata?: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
