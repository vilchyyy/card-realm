import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import GamePlayer from './game_player.js'
import { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Zone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare isFaceup: boolean

  @belongsTo(() => GamePlayer)
  declare gamePlayer: BelongsTo<typeof GamePlayer>

  @column()
  declare gamePlayerId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
