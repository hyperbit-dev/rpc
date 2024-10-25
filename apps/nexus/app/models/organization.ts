import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import {
  BaseModel,
  beforeCreate,
  hasManyThrough,
  hasMany,
  hasOne,
  column,
} from '@adonisjs/lucid/orm'
import type { HasOne, HasMany, HasManyThrough } from '@adonisjs/lucid/types/relations'
import OrganizationUser from '#models/organization_user'
import StripeSubscription from '#models/stripe_subscription'
import User from '#models/user'

export default class Organization extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare ownerId: string

  @column()
  declare stripeCustomerId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(model: Organization) {
    model.id = uuidv4()
  }

  @hasOne(() => User)
  declare owner: HasOne<typeof User>

  @hasMany(() => StripeSubscription)
  declare subscriptions: HasMany<typeof StripeSubscription>

  @hasManyThrough([() => User, () => OrganizationUser])
  declare users: HasManyThrough<typeof User>
}
