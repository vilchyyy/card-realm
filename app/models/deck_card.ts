import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Deck from './deck.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseCard from './base_card.js'

export default class DeckCard extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => BaseCard)
  declare baseCard: BelongsTo<typeof BaseCard>

  @column()
  declare baseCardId: string

  @column()
  declare quantity: number

  @belongsTo(() => Deck)
  declare deck: BelongsTo<typeof Deck>

  @column()
  declare deckId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
