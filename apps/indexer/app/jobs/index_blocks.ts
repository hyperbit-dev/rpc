import { IndexerService } from '#services/indexer_service'
import { Job } from 'adonisjs-jobs'

type IndexBlocksPayload = {}

export default class IndexBlocks extends Job {
  async handle(_: IndexBlocksPayload) {
    try {
      await IndexerService.indexBlocks()
    } catch (e) {
      console.log('job error', e)
    }
  }
}
