import Game from '#models/game'
import GamePlayer from '#models/game_player'
import Zone from '#models/zone'
import type { HttpContext } from '@adonisjs/core/http'

export default class GamesController {
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
      throw new Error('User not logged in')
    }
    const game = new Game()
    game.slots = 5
    game.ownerId = auth.user.id
    await game.save()
    console.log(game)
  }

  /**
   * Show individual record
   */
  async show({ params, inertia, auth, response }: HttpContext) {
    if (!auth.user || !auth.user.id) {
      console.log(auth)
      response.redirect().toPath('/login')
    }
    const game = await Game.find(params.id)

    if (!game) {
      response.redirect().toPath('/games')
    }

    const player = await GamePlayer.firstOrNew({ gameId: game?.id, userId: auth.user?.id ?? 0 })
    const mainZone = await Zone.firstOrNew({
      gamePlayerId: player.id,
      name: 'main',
      isFaceup: true,
    })

    const deckZone = await Zone.firstOrNew({
      gamePlayerId: player.id,
      name: 'deck',
      isFaceup: false,
    })

    const handZone = await Zone.firstOrNew({
      gamePlayerId: player.id,
      name: 'hand',
      isFaceup: true,
    })

    await player.save()
    await mainZone.save()
    await deckZone.save()
    await handZone.save()

    return inertia.render('game', { game: game, user: auth.user })
  }

  //   /**
  //    * Edit individual record
  //    */
  //   async edit({ params }: HttpContext) {}

  //   /**
  //    * Handle form submission for the edit action
  //    */
  //   async update({ params, request }: HttpContext) {}

  //   /**
  //    * Delete record
  //    */
  //   async destroy({ params }: HttpContext) {}
}
