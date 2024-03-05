import BlockchainNode from '#models/blockchain_node'
import type { HttpContext } from '@adonisjs/core/http'

export default class BlockchainNodesController {
  async index({ auth, request }: HttpContext) {
    const payload = request.only(['page', 'limit'])
    const page = payload.page ?? 1
    const limit = payload.limit ?? 10

    const nodes = await BlockchainNode.query()
      .preload('blockchain')
      .where('user_id', auth.user!.id)
      .paginate(page, limit)

    return nodes
  }
}
