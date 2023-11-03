import { PrismaClient } from "@prisma/client";
import cron from "node-cron";
import { Block } from "../models/block";
import { Transaction } from "../models/transaction";
// import { Address } from "../models/address";
import { Vin } from "../models/vin";
import { Vout } from "../models/vout";
import rpcClient from "../utils/rpc";

let blocksJobsRunning = false;
const prisma = new PrismaClient();

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const blocksJob = cron.schedule(
  " */1 * * * * *",
  async () => {
    console.log("blocksJobsRunning", blocksJobsRunning);
    if (!blocksJobsRunning) {
      blocksJobsRunning = true;
      const blocks = await prisma.block.findMany({
        orderBy: {
          id: "desc",
        },
        take: 1,
      });

      let height: number;
      if (!blocks.length) {
        height = 0;
      } else {
        height = blocks[0].height + 1;
      }

      try {
        const newBlocks: any[] = [];
        const arr = Array.from(Array(100).keys());
        await arr.forEach(async (_, i) => {
          const b = await insertBlock(height + i);
          newBlocks.push(b);
        });
        console.log("newBlocks", newBlocks);
        await prisma.block.createMany({
          data: newBlocks,
        });
      } catch (e) {
        console.log("e", e);
      }

      console.log("job running");
      await delay(5000);

      // console.log('res', res)
      console.log("finished");
    }
    blocksJobsRunning = false;
  },
  {
    scheduled: false,
  }
);

async function insertBlock(height: number) {
  const blockhash = await rpcClient.request("getblockhash", [height]);
  const block = await rpcClient.request("getblock", [blockhash, 2]);

  try {
    //   const blockchaininfo = await rpcClient.request("getblockchaininfo");
    //   console.log("blockchaininfo", blockchaininfo.blocks);
    const addresses: string[] = [];
    const transactionsModels = block.tx.map((tx: Transaction) => {
      const transaction = new Transaction(tx);
      transaction.vin = { create: tx.vin.map((v: any) => new Vin(v)) };
      transaction.vout = { create: tx.vout.map((v: any) => new Vout(v)) };

      tx.vin.forEach((v: any) => {
        if (v?.address) {
          addresses.push(v.address);
        }
      });
      tx.vout.forEach((v: any) => {
        if (v?.scriptPubKey?.addresses) {
          v.scriptPubKey.addresses.forEach((a: string) => addresses.push(a));
        }
      });
      return transaction;
    });

    const blockModel = new Block(block);
    return { ...blockModel, tx: { create: transactionsModels } };

    // const addrs = Array.from(new Set(addresses)).map(
    //   (address: string) => new Address({ address })
    // );
    // await prisma.address.createMany({
    //   data: addrs,
    // });
  } catch (e) {
    console.log("e", e);
    return undefined;
  }
}
