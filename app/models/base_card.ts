import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Deck from './deck.js'

export default class BaseCard extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Deck, {
    pivotTable: 'deck_cards',
  })
  declare decks: ManyToMany<typeof Deck>

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare power: number

  @column()
  declare toughness: number

  @column()
  declare image: string

  @column()
  declare type: string

  @column()
  declare manaCost: string

  @column()
  declare artist: string

  @column()
  declare flavorText: string
}
