import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ inertia, auth, response }: HttpContext) {
    console.log(await auth.check())
    if (await !auth.check()) {
      return response.redirect('/discord')
    }
    console.log(auth.user?.$attributes)

    return inertia.render('home', { user: auth.user })
  }
}
