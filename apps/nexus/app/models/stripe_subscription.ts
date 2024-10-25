import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Organization from '#models/organization'
import { v4 as uuidv4 } from 'uuid'

export default class StripeSubscription extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare organizationId: string

  @column()
  declare stripeSubscriptionId: string

  @column()
  declare planType: string

  @column()
  declare status: string

  @column()
  declare startDate: Date

  @column()
  declare endDate: Date | null

  @column()
  declare billingCycle: string

  @column()
  declare trialEnd: Date | null

  @column()
  declare gracePeriodEndsAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>

  @beforeCreate()
  static assignUuid(model: StripeSubscription) {
    model.id = uuidv4()
  }
}
