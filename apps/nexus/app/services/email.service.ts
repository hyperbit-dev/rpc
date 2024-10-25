import { v4 as uuidv4 } from 'uuid'
import EmailVerification from '#models/email_verification'
import env from '#start/env'
import mail from '@adonisjs/mail/services/main'
import User from '#models/user'

class EmailService {
  public async sendEmail(user: User) {
    const token = uuidv4()

    await EmailVerification.create({
      userId: user.id,
      token,
    })

    const verificationUrl = `${env.get('APP_URL')}/auth/verify/${token}`
    await mail.use('resend').send((message) => {
      message
        .to(user.email)
        .from('no-reply@hyperbit.app')
        .subject('Verify your email address')
        .htmlView('emails/verify', { user, verificationUrl })
    })
  }

  public async verifyEmail(token: string) {
    const verification = await EmailVerification.query().where('token', token).firstOrFail()

    const user = await User.findOrFail(verification.userId)
    user.emailVerified = true

    await user.save()
    await verification.delete()
  }

  public async checkVerificationStatus(user: User) {
    if (user.emailVerified) {
      return true
    }
    const verifications = await EmailVerification.query().where('userId', user.id)
    if (!verifications) {
      await this.sendEmail(user)
    }
  }
}

export default new EmailService()
