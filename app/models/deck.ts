import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import BaseCard from './base_card.js'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @hasOne(() => User)
  declare userId: HasOne<typeof User>

  @manyToMany(() => BaseCard)
  declare cards: ManyToMany<typeof BaseCard>
}
