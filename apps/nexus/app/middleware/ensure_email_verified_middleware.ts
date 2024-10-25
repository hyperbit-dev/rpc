import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class EnsureEmailVerifiedMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (!ctx.auth.user?.emailVerified) {
      return ctx.response.unauthorized('Email not verified')
    }
    await next()
  }
}
