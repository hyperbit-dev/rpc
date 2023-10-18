import { PrismaClient } from "@prisma/client";
import cron from "node-cron";
import { Block } from "../models/block";
import { Transaction } from "../models/transaction";
import { Address } from "../models/address";
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

      let block;
      if (!blocks.length) {
        const blockhash = await rpcClient.request("getblockhash", [0]);
        block = await rpcClient.request("getblock", [blockhash, 2]);
      } else {
        const height = blocks[0].height + 1;
        const blockhash = await rpcClient.request("getblockhash", [height]);
        block = await rpcClient.request("getblock", [blockhash, 2]);
      }

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
              v.scriptPubKey.addresses.forEach((a: string) =>
                addresses.push(a)
              );
            }
          });
          return transaction;
        });

        const blockModel = new Block(block);
        await prisma.block.create({
          data: { ...blockModel, tx: { create: transactionsModels } },
        });

        const addrs = Array.from(new Set(addresses)).map(
          (address: string) => new Address({ address })
        );
        await prisma.address.createMany({
          data: addrs,
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
