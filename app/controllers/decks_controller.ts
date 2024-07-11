import BaseCard from '#models/base_card'
import Deck from '#models/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
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
  async store({ request, auth }: HttpContext) {
    if (!auth.user) {
      return 'Unauthorized'
    }
    const data = await request.all()
    const cards = data.deck.split('\n')
    const deck = new Deck()
    await deck.related('user').associate(auth.user)

    for (const card of cards) {
      if (card === '') continue
      let splitCard = [card.split(' ')[0], card.slice(card.indexOf(' ') + 1)]
      if (!Number.parseInt(splitCard[0])) {
        console.log(splitCard[0])
        continue
      }
      if (splitCard[1].includes('/') && !splitCard[1].includes(' // ')) {
        splitCard[1] = splitCard[1].replaceAll('/', ' // ')
      }
      const baseCard = await BaseCard.findByOrFail('name', splitCard[1]).catch(() => {
        return splitCard[1]
      })

      await deck.related('cards').attach({
        [baseCard.id]: {
          quantity: Number.parseInt(splitCard[0]),
        },
      })
    }

    deck.name = data.name
    deck.save()

    return data.deck
  }

  /**
   * Show individual record
   */
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
