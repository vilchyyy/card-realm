import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Game from './game.js'
import User from './user.js'
import Zone from './zone.js'

export default class GamePlayer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>

  @column()
  declare gameId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare userId: number

  @hasMany(() => Zone)
  declare zones: HasMany<typeof Zone>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
