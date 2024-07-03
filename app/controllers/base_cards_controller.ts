import BaseCard from '#models/base_card'
import type { HttpContext } from '@adonisjs/core/http'

export default class BaseCardsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    console.log('mieli')
    const res = await fetch(
      'https://data.scryfall.io/default-cards/default-cards-20240703090601.json'
    )
    const data: any = await res.json()
    const cards = await BaseCard.updateOrCreateMany(
      'id',
      data.slice(0, 60000).map((card: any) => ({
        id: card.id,
        name: card.name,
        description: card.oracle_text,
        manaCost: card.mana_cost,
        power: !Number.isNaN(Number.parseInt(card.power)) ? Number.parseInt(card.power) : null,
        toughness: !Number.isNaN(Number.parseInt(card.toughness))
          ? Number.parseInt(card.toughness)
          : null,
        image: card.image_uris?.normal ?? '',
        type: card.type_line,
        artist: card.artist,
        flavorText: card.flavor_text,
      }))
    )
    const cards2 = await BaseCard.updateOrCreateMany(
      'id',
      data.slice(-60000).map((card: any) => ({
        id: card.id,
        name: card.name,
        description: card.oracle_text,
        manaCost: card.mana_cost,
        power: !Number.isNaN(Number.parseInt(card.power)) ? Number.parseInt(card.power) : null,
        toughness: !Number.isNaN(Number.parseInt(card.toughness))
          ? Number.parseInt(card.toughness)
          : null,
        image: card.image_uris?.normal ?? '',
        type: card.type_line,
        artist: card.artist,
        flavorText: card.flavor_text,
      }))
    )

    return {
      cards: cards,
      cards2: cards2,
    }
  }

  /**
   * Show individual record
  //  */
  // async show({ params }: HttpContext) {}

  // /**
  //  * Edit individual record
  //  */
  // async edit({ params }: HttpContext) {}

  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request }: HttpContext) {}

  // /**
  //  * Delete record
  //  */
  // async destroy({ params }: HttpContext) {}
}
