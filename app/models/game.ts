import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import GamePlayer from './game_player.js'

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slots: number

  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>

  @column()
  declare ownerId: number

  @hasMany(() => GamePlayer)
  declare players: HasMany<typeof GamePlayer>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
