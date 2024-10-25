import AuthAccessToken from '#models/auth_access_token'
import Organization from '#models/organization'
import OrganizationUser from '#models/organization_user'
import User from '#models/user'
import emailService from '#services/email.service'
import { registerValidator } from '#validators/auth'
import { MessageBuilder } from '@adonisjs/core/helpers'
import stringHelpers from '@adonisjs/core/helpers/string'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user, undefined, {
        name: request.input('session_token'),
        expiresIn: '24 hours',
      })

      await emailService.checkVerificationStatus(user)

      return token
    } catch (error) {
      return response.status(400).send({ message: 'Something went wrong' })
    }
  }

  async logout({ auth, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }
    const user = await User.findBy('id', auth.user.id)

    await User.accessTokens.delete(user!, auth.user.currentAccessToken.identifier)
    // delete all access tokens with the name 'session_token' for the user
    await AuthAccessToken.query()
      .where('tokenable_id', user!.id)
      .where('name', 'session_token')
      .delete()
  }

  // TODO: Make all registrations "valid" in order to hide users from phishing attempts
  async register({ request, response }: HttpContext) {
    const credentials = request.only(['organization', 'email', 'password', 'passwordConfirmation'])
    try {
      await registerValidator.validate(credentials)

      const user = await User.create({
        email: credentials.email,
        password: credentials.password,
      })
      const organization = await Organization.create({
        name: credentials.organization,
        ownerId: user.id,
      })
      await OrganizationUser.create({
        userId: user.id,
        organizationId: organization.id,
      })

      const token = await User.accessTokens.create(user, undefined, {
        name: request.input('session_token'),
        expiresIn: '24 hours',
      })

      await emailService.sendEmail(user)

      return token
    } catch (error) {
      return response.status(400).send({ message: 'Something went wrong' })
    }
  }

  // TODO: Make all resets "valid" in order to hide users from phishing attempts
  async reset({ request }: HttpContext) {
    const { email } = request.only(['email'])
    const user = await User.findBy('email', email)
    console.log('user', user)
    const builder = new MessageBuilder()
    const token = builder.build(
      {
        token: stringHelpers.random(32),
      },
      '24 hour',
      'password_reset'
    )
    console.log('token', token)
    // insert into database
    // send reset password link
  }

  // TODO: Make all resets "valid" in order to hide users from phishing attempts
  async resetVerify({ request }: HttpContext) {
    const { token } = request.only(['token', 'password', 'passwordConfiration'])
    const builder = new MessageBuilder()
    const decoded = builder.verify(token, 'password_reset')
    if (!decoded) {
      return 'Invalid payload'
    }
    // update user
    // remove from database
  }

  public async verifyEmail({ request, response }: HttpContext) {
    try {
      const { token } = request.params()
      await emailService.verifyEmail(token)
    } catch {
      response.abort({ message: 'Cannot verify email' })
    }
  }

  async provider({ ally, response, request }: HttpContext) {
    const { token: providerToken } = request.only(['token'])
    const provider = request.param('provider')
    switch (provider) {
      case 'google':
        try {
          const user = await ally.use('google').userFromToken(providerToken)
          let dbUser = await User.findBy('email', user.email)
          if (!dbUser) {
            dbUser = await User.create({
              fullName: user.name,
              email: user.email,
              password: user.token.token,
            })
          }
          // TODO Send email verification and password setup
          const token = await User.accessTokens.create(dbUser, undefined, {
            name: request.input('session_token'),
            expiresIn: '24 hours',
          })

          return token
        } catch (error) {
          console.log('error', error)
          return response.status(500).send({ message: 'Something went wrong' })
        }
      default:
        return response.status(400).send({ message: 'Provider not found' })
    }
  }

  async getSessions({ auth }: HttpContext) {
    return AuthAccessToken.query().where('tokenable_id', auth.user!.id)
  }
}
