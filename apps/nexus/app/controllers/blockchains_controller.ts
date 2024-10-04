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

  async rpcRequest({ request, params, response }: HttpContext) {
    const getBlockValidator = vine.compile(
      vine.object({
        symbol: blockchainSymbolValidator,
      })
    )

    const getRpcValidator = vine.compile(
      vine.object({
        command: rpcCommandValidator,
      })
    )

    try {
      const { symbol } = await getBlockValidator.validate(params)
      const { command, ...args } = request.body()
      const { command: method } = await getRpcValidator.validate({ command })

      const blockchainService = BlockchainFactory.getService(symbol)
      return blockchainService.request(method, args)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
