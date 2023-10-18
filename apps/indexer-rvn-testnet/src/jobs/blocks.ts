import { PrismaClient } from '@prisma/client'
import cron from "node-cron";
import rpcClient from "../../src/utils/rpc";

let blocksJobsRunning = false;
const prisma = new PrismaClient()

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const blocksJob = cron.schedule(
  " */2 * * * * *",
  async () => {
    console.log('blocksJobsRunning', blocksJobsRunning)
    if (!blocksJobsRunning) {
      blocksJobsRunning = true;
      const blocks = await prisma.block.findMany({
        orderBy: {
          id: 'desc',
        }, take: 1
      })
      console.log('blocks', blocks)
      if (!blocks.length) {

        const blockchaininfo = await rpcClient.request('getblockchaininfo')
        console.log('blockchaininfo', blockchaininfo.blocks)
        const blockhash = await rpcClient.request('getblockhash', [0])
        console.log('blockhash', blockhash)
        const block = await rpcClient.request('getblock', [blockhash, 2])
        console.log('block', block)
        // insert first block
      }

      console.log('job running')
      await delay(5000)

      // console.log('res', res)
      console.log('finished')
      blocksJobsRunning = false;
    }
  },
  {
    scheduled: false,
  }
);
