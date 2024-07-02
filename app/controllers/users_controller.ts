import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ inertia, auth, response }: HttpContext) {
    return inertia.render('home', { user: auth.user })
  }
}
