/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const BaseCardsController = () => import('#controllers/base_cards_controller')
import User from '#models/user'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('base_cards', [BaseCardsController, 'store'])

router
  .get('/', async ({ inertia, auth }) => {
    return inertia.render('home', { user: auth.user })
  })
  .use(middleware.auth())

router
  .get('logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/')
  })
  .use(middleware.auth())

router.get('users', [UsersController, 'index']).use(middleware.auth())
router.get('/discord/', async ({ ally }) => {
  ally.use('discord').redirect()
})

router.get('/login', async ({ ally }) => {
  ally.use('discord').redirect()
})

router.get('/discord/redirect', async ({ ally, auth, response }) => {
  const discord = ally.use('discord')

  if (discord.accessDenied()) {
    return 'Access Denied'
  }

  if (discord.stateMisMatch()) {
    return 'Request expired'
  }

  if (discord.hasError()) {
    return discord.getError()
  }

  const user = await discord.user()

  const userDetails = {
    name: user.name,
    email: user.email,
    avatar: user.avatarUrl,
    provider_id: user.id,
    provider: 'discord',
  }

  const newUser = await User.firstOrCreate({ email: user.email }, userDetails)
  await auth.use('web').login(newUser)
  return response.redirect('/')
})
