import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import GamePlayer from './game_player.js'
import Zone from './zone.js'
import BaseCard from './base_card.js'
import User from './user.js'

export default class GameCard extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => GamePlayer)
  declare controller: BelongsTo<typeof GamePlayer>

  @column()
  declare controllerId: number

  @belongsTo(() => Zone)
  declare zone: BelongsTo<typeof Zone>

  @column()
  declare zoneId: number

  @belongsTo(() => BaseCard)
  declare baseCard: BelongsTo<typeof BaseCard>

  @column()
  declare baseCardId: string

  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
