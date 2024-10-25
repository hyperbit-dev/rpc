import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ApiLoggerMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    // Start the timer for calculating duration
    const startTime = Date.now()

    // Calculate the request size
    const rawBody = request.raw()
    const requestSize = Buffer.byteLength(rawBody || '')

    // Call the next middleware or controller action
    await next()

    // Calculate the response size
    const responseBody = response.lazyBody.content
    const responseSize = Buffer.byteLength(JSON.stringify(responseBody))

    // Calculate the duration in milliseconds
    const endTime = Date.now()
    const durationMs = endTime - startTime

    // Log or store the values
    console.log(
      `Request size: ${requestSize} bytes, Response size: ${responseSize} bytes, Duration: ${durationMs} ms`
    )

    // Optionally store these values in a database
  }
}
