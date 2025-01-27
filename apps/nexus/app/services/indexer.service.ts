import db from '@adonisjs/lucid/services/db'

export default class IndexerService {
  private node: any;
  private dbContext: string;

  constructor(node: any, dbContext: string) {
    this.node = node;
    this.dbContext = dbContext;
  }

  /**
   * Set the database context for the right blockchain.
   */
  private setDatabaseContext() {
    db.manager.connect(this.dbContext);
  }

  /**
   * Sync blocks from the blockchain to the database in batches.
   * @param batchSize Number of blocks to process in each batch.
   */
  public async syncBlocks(batchSize: number = 100): Promise<void> {
    this.setDatabaseContext();
    console.log('Starting block synchronization...');

    const latestIndexedBlock = await this.getLatestIndexedBlock();

    const latestBlock = await this.node.getLatestBlock();
    let startHeight = latestIndexedBlock ? latestIndexedBlock.height + 1 : 0;

    console.log(`Syncing from block height ${startHeight} to ${latestBlock.height}`);

    while (startHeight <= latestBlock.height) {
      const endHeight = Math.min(startHeight + batchSize - 1, latestBlock.height);

      console.log(`Fetching blocks ${startHeight} to ${endHeight}`);
      const blocks = await Promise.all(
        Array.from({ length: endHeight - startHeight + 1 }, (_, i) =>
          this.node.getBlockByHeight(startHeight + i)
        )
      );

      await this.storeBlocks(blocks);

      startHeight = endHeight + 1;
    }

    console.log('Block synchronization complete.');
  }

  /**
   * Retrieve the latest indexed block from the database.
   */
  private async getLatestIndexedBlock() {
    return await db.from('blocks').orderBy('height', 'desc').first();
  }

  /**
   * Store block and transaction data in the database in a batch.
   */
  private async storeBlocks(blocks: any[]): Promise<void> {
    const trx = await db.transaction();

    try {
      for (const block of blocks) {
        // Insert block data
        await trx.table('blocks').insert({
          block_hash: block.hash,
          height: block.height,
          timestamp: block.timestamp,
          difficulty: block.difficulty,
          prev_block_hash: block.prev_block_hash,
        });

        // Insert transaction data
        for (const tx of block.transactions) {
          await trx.table('transactions').insert({
            txid: tx.txid,
            block_hash: block.hash,
          });

          // Insert input data
          for (const input of tx.inputs) {
            await trx.table('inputs').insert({
              txid: tx.txid,
              input_txid: input.txid,
              input_index: input.index,
              address: input.address,
              value: input.value,
            });
          }

          // Insert output data
          for (const output of tx.outputs) {
            await trx.table('outputs').insert({
              txid: tx.txid,
              output_index: output.index,
              address: output.address,
              value: output.value,
            });
          }
        }
      }

      await trx.commit();
      console.log(`Successfully stored ${blocks.length} blocks.`);
    } catch (error) {
      await trx.rollback();
      console.error('Error storing blocks:', error);
      throw error;
    }
  }
}
