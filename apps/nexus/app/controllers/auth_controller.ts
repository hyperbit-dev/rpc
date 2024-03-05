import User from '#models/user'
import { registerValidator } from '#validators/auth'
import { MessageBuilder } from '@adonisjs/core/helpers'
import stringHelpers from '@adonisjs/core/helpers/string'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return token
  }

  async logout({ auth }: HttpContext) {
    const user = await User.findBy('id', auth.user!.id)
    await User.accessTokens.delete(user!, auth.user!.currentAccessToken.identifier)
  }

  async register({ request }: HttpContext) {
    const credentials = request.only(['email', 'password', 'passwordConfirmation'])
    await registerValidator.validate(credentials)

    const user = await User.create({
      email: credentials.email,
      password: credentials.password,
    })
    const token = await User.accessTokens.create(user)

    return token
  }

  async reset({ request }: HttpContext) {
    const { email } = request.only(['email'])
    const user = await User.findBy('email', email)
    const builder = new MessageBuilder()
    const token = builder.build(
      {
        token: stringHelpers.random(32),
      },
      '24 hour',
      'password_reset'
    )
    // insert into database
    // send reset password link
  }

  async resetVerify({ request }: HttpContext) {
    const { token, password, passwordConfiration } = request.only([
      'token',
      'password',
      'passwordConfiration',
    ])
    const builder = new MessageBuilder()
    const decoded = builder.verify(token, 'password_reset')
    if (!decoded) {
      return 'Invalid payload'
    }
    // update user
    // remove from database
  }
}
