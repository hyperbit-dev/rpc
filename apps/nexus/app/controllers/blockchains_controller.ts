import type { HttpContext } from '@adonisjs/core/http'
import Blockchain from '#models/blockchain'
import BlockchainFactory from '#services/blockchain.factory'
import vine from '@vinejs/vine'
import { blockchainSymbolValidator } from '#validators/blockchain'
import { rpcCommandValidator } from '#validators/rpc'

export default class BlockchainsController {
  async getAll({ auth, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    return Blockchain.query()
      .where('active', true)
      .preload('networks', (query) => {
        query.where('active', true).select('id', 'name', 'chain_id')
      })
      .select('id', 'name', 'symbol')
  }

  async getSingle({ auth, request, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized()
    }

    return Blockchain.query()
      .where('id', request.param('id'))
      .where('active', true)
      .preload('networks', (query) => {
        query.where('active', true).select('id', 'name', 'chain_id')
      })
      .select('id', 'name', 'symbol')
      .first()
  }

  async rpcMethodRequest({ request, params, response }: HttpContext) {
    const getBlockValidator = vine.compile(
      vine.object({
        symbol: blockchainSymbolValidator,
        method: rpcCommandValidator,
      })
    )

    try {
      const { symbol, method } = await getBlockValidator.validate(params)
      const data = request.body()

      const blockchainService = BlockchainFactory.getService(symbol)
      return blockchainService.request(method, data)
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async rpcRawRequest({ request, params, response }: HttpContext) {
    const getBlockValidator = vine.compile(
      vine.object({
        symbol: blockchainSymbolValidator,
      })
    )

    const getBodyValidator = vine.compile(
      vine.object({
        jsonrpc: vine.enum(['2.0']),
        method: rpcCommandValidator,
        params: vine.array(vine.any()),
        id: vine.string(),
      })
    )

    try {
      const { symbol } = await getBlockValidator.validate(params)
      const args = await getBodyValidator.validate(request.body())

      const blockchainService = BlockchainFactory.getService(symbol)
      return blockchainService.rawRequest(args)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
