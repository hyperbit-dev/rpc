import db from '@adonisjs/lucid/services/db'
import { Client } from '@hyperbitjs/rpc'
import { v4 as uuidv4 } from 'uuid'
import env from '#start/env'
import Block from '#models/block'
import Address from '#models/address'
import Asset from '#models/asset'
import AddressAsset from '#models/address_asset'
import AddressTransaction from '#models/address_transaction'
import AssetTransaction from '#models/asset_transaction'

export class IndexerService {
  static async indexBlocks() {
    const COUNT = 500
    let startingHeight
    let endingHeight

    console.log('Batch Indexing Started')

    const client = new Client({
      url: env.get('RPC_HOST')!,
      username: env.get('RPC_USERNAME'),
      password: env.get('RPC_PASSWORD'),
    })

    for (let i = 0; i < COUNT; i++) {
      const newestBlock = await this.getLatestBlock(client)
      console.log('Indexing Block:', newestBlock.height)
      if (newestBlock && !newestBlock?.code) {
        await this.indexBlock(newestBlock, client)
        if (i === 0) {
          startingHeight = newestBlock.height
        }
        endingHeight = newestBlock.height
      } else if (!newestBlock) {
        break
      }
    }

    console.log(`Batch Indexing Complete: ${startingHeight} - ${endingHeight}`)
  }

  static async indexBlock(block: any, client: Client) {
    const trx = await db.transaction()

    try {
      const blockId = uuidv4()

      await this.insertBlock(blockId, block, trx)
      await this.insertHashrate(blockId, block, trx)
      await this.insertTransactions(blockId, block.tx, client, trx)

      await trx.commit()
    } catch (error) {
      console.log('error', error)
      trx.rollback()
    }
  }

  static async getLatestBlock(client: Client) {
    const latestBlock = await Block.query().orderBy('height', 'desc').first()

    if (latestBlock) {
      const block = await client.request('getblock', [latestBlock.nextblockhash, 2])
      if (block?.code === 500 || !block) {
        return undefined
      }
      return block
    }

    const blockhash = await client.request('getblockhash', [1])
    const block = await client.request('getblock', [blockhash, 2])
    if (block?.code === 500 || !block) {
      return undefined
    }
    return block
  }

  static async insertBlock(blockId: string, block: any, trx: any) {
    await trx.insertQuery().table('blocks').insert({
      id: blockId,
      hash: block.hash,
      // confirmations: block.confirmations,
      strippedsize: block.strippedsize,
      size: block.size,
      weight: block.weight,
      height: block.height,
      version: block.version,
      versionHex: block.versionHex,
      merkleroot: block.merkleroot,
      time: block.time,
      mediantime: block.mediantime,
      nonce: block.nonce,
      bits: block.bits,
      difficulty: block.difficulty,
      chainwork: block.chainwork,
      headerhash: block.headerhash,
      mixhash: block.mixhash,
      nonce64: block.nonce64,
      previousblockhash: block.previousblockhash,
      nextblockhash: block.nextblockhash,
    })
  }

  static async insertTransactions(blockId: string, transactions: any[], client: Client, trx: any) {
    for (const tx of transactions) {
      await this.insertTransaction(blockId, tx, client, trx)
    }
  }

  static async insertTransaction(blockId: string, tx: any, client: Client, trx: any) {
    const txid = uuidv4()

    await trx.insertQuery().table('transactions').insert({
      id: txid,
      txid: tx.txid,
      hash: tx.hash,
      version: tx.version,
      size: tx.size,
      vsize: tx.vsize,
      locktime: tx.locktime,
      hex: tx.hex,
      block_id: blockId,
    })

    for (let j = 0; j < tx.vin.length; j++) {
      const vin = tx.vin[j]

      const addressId = uuidv4()
      const address = vin.coinbase ? 'coinbase' : vin.address

      if (address) {
        await this.insertOrCreateAddress(addressId, address, tx.time, client, trx)
        await trx.insertQuery().table('transaction_vins').insert({
          id: uuidv4(),
          transaction_id: txid,
          txid: tx.txid,
          coinbase: vin.coinbase,
          sequence: vin.sequence,
          script_sig_asm: vin?.scriptSig?.asm,
          script_sig_hex: vin?.scriptSig?.hex,
          address,
          value: vin.value,
          value_sat: vin.valueSat,
        })

        const addressTransactionId = uuidv4()
        await this.insertOrCreateAddressTransaction(
          addressTransactionId,
          tx.txid,
          address,
          tx.time,
          trx
        )
      }
    }

    for (let k = 0; k < tx.vout.length; k++) {
      const vout = tx.vout[k]

      await trx
        .insertQuery()
        .table('transaction_vouts')
        .insert({
          id: uuidv4(),
          transaction_id: txid,
          txid: tx.txid,
          value: vout.value,
          value_sat: vout.valueSat,
          n: vout.n,
          script_pub_key_asm: vout.scriptPubKey.asm,
          script_pub_key_hex: vout.scriptPubKey.hex,
          script_pub_key_req_sigs: vout.scriptPubKey.reqSigs,
          script_pub_key_type: vout.scriptPubKey.type,
          script_pub_key_addresses: vout?.scriptPubKey?.addresses
            ? JSON.stringify(vout.scriptPubKey.addresses)
            : '',
          script_pub_key_asset_name: vout.scriptPubKey.asset?.name,
          script_pub_key_asset_amount: vout.scriptPubKey.asset?.amount,
          script_pub_key_asset_expire_time: vout.scriptPubKey.asset?.expireTime,
          script_pub_key_asset_units: vout.scriptPubKey.asset?.units,
          script_pub_key_asset_reissuable: vout.scriptPubKey.asset?.reissuable,
          spent_txid: vout.spentTxid,
          spent_index: vout.spentIndex,
          spent_height: vout.spentHeight,
        })

      if (vout?.scriptPubKey?.addresses?.length) {
        for (let l = 0; l < vout.scriptPubKey.addresses.length; l++) {
          const address = vout.scriptPubKey.addresses[l]
          const addressTransactionId = uuidv4()
          const addressId = uuidv4()
          const assetId = uuidv4()

          await this.insertOrCreateAddress(addressId, address, tx.time, client, trx)
          if (vout.scriptPubKey.asset) {
            const asset = vout.scriptPubKey.asset
            await this.insertOrCreateAsset(assetId, asset, trx)
            await this.insertOrCreateAddressAsset(address, vout.scriptPubKey.asset, client, trx)

            await this.insertOrCreateAssetTransaction(
              addressTransactionId,
              tx.txid,
              asset.name,
              tx.time,
              trx
            )
          }

          await this.insertOrCreateAddressTransaction(
            addressTransactionId,
            tx.txid,
            address,
            tx.time,
            trx
          )
        }
      }
    }
  }

  static async insertOrCreateAssetTransaction(
    id: string,
    txid: string,
    asset: string,
    time: number,
    trx: any
  ) {
    try {
      // Use firstOrCreate to insert or create the asset
      const assetTransaction = await AssetTransaction.firstOrCreate(
        { txid, asset }, // Search criteria
        { id, txid, asset, time }, // Fields to insert if not found
        { client: trx } // Transaction client
      )

      return assetTransaction
    } catch (error) {
      console.error(`Error inserting or creating asset transaction at txid ${txid}:`, error)
    }
  }

  static async insertOrCreateAddressTransaction(
    id: string,
    txid: string,
    address: string,
    time: number,
    trx: any
  ) {
    try {
      // Use firstOrCreate to insert or create the address
      const addressTransaction = await AddressTransaction.firstOrCreate(
        { txid, address }, // Search criteria
        { id, txid, address, time }, // Fields to insert if not found
        { client: trx } // Transaction client
      )

      return addressTransaction
    } catch (error) {
      console.error(`Error inserting or creating address transaction as txid ${txid}:`, error)
    }
  }

  static async insertOrCreateAddress(
    addressId: string,
    address: string,
    time: number,
    client: Client,
    trx: any
  ) {
    try {
      // Use firstOrCreate to insert or create the address
      const addressRecord = await Address.firstOrCreate(
        { address }, // Search criteria
        { id: addressId, address }, // Fields to insert if not found
        { client: trx } // Transaction client
      )

      const rpcAddress = await client.request('getaddressbalance', [address])
      // const rpcAddressTxs = await client.request('getaddresstxids', [address])
      addressRecord.lastSeen = time
      addressRecord.balance = rpcAddress.balance
      addressRecord.received = rpcAddress.received
      // addressRecord.transactionCount = rpcAddressTxs.length

      await addressRecord.save()

      return addressRecord
    } catch (error) {
      console.error(`Error inserting or creating address for ${address}:`, error)
    }
  }

  static async insertOrCreateAsset(assetId: string, asset: any, trx: any) {
    try {
      // Use firstOrCreate to insert or create the asset
      const assetRecord = await Asset.firstOrCreate(
        { name: asset.name }, // Search criteria
        {
          id: assetId,
          name: asset.name,
          amount: asset.amount,
          expireTime: asset.expire_time,
          units: asset.units,
          reissuable: asset.reissuable,
          hasIpfs: !!asset.ipfs_hash,
          ipfsHash: asset.ipfs_hash,
        }, // Fields to insert if not found
        { client: trx } // Transaction client
      )

      return assetRecord
    } catch (error) {
      console.error(`Error inserting or creating asset ${asset}:`, error)
    }
  }

  static async insertOrCreateAddressAsset(address: string, asset: any, client: Client, trx: any) {
    try {
      const id = uuidv4()
      const { name } = asset

      // Use firstOrCreate to insert or create the asset
      const assetRecord = await AddressAsset.firstOrCreate(
        { address, asset: name }, // Search criteria
        {
          id,
          address,
          asset: name,
        }, // Fields to insert if not found
        { client: trx } // Transaction client
      )

      const balances = await client.request('listassetbalancebyaddress', [address])
      if (balances[asset.name] !== 0) {
        assetRecord.amount = balances[asset.name]
        await assetRecord.save()
      } else {
        await assetRecord.delete()
      }

      return assetRecord
    } catch (error) {
      console.error(`Error inserting or creating address asset ${address}, ${asset}:`, error)
    }
  }

  static async insertHashrate(blockId: string, block: any, trx: any) {
    if (!block.previousblockhash) return

    const prevBlock = await Block.query().where('hash', block.previousblockhash).first()
    if (!prevBlock) return

    const blockTime =
      Math.abs(new Date(block.time).getTime() - new Date(prevBlock.time).getTime()) / 1000
    if (blockTime === 0) return

    const hashrate = (block.difficulty * Math.pow(2, 32)) / blockTime

    await trx.insertQuery().table('hashrates').insert({
      id: uuidv4(),
      block_id: blockId,
      hashrate,
      time: block.time,
      calculated_at: new Date(),
    })
  }
}
