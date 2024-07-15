import Game from '#models/game'
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
  }

  /**
   * Show individual record
   */
  async show({ params, inertia, auth, response }: HttpContext) {
    if (!auth.user) {
      console.log(auth)
      response.redirect().toPath('/login')
    }
    const game = await Game.find(params.id)
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
