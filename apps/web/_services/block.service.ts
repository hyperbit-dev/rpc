import rpcClients from "~/_api/rpcClient";
import { connect, redisClient } from "@/_lib/redis";

function isNumeric(value: string) {
  return /^\d+$/.test(value);
}

class BlockService {
  public async getBlockByHeight(blockchain: string, height: string) {
    await connect();

    const redisRef = `rpc:${blockchain}:getblockhash:${height}`;

    try {
      const res = await redisClient.json.get(redisRef);
      if (res && res?.status !== 500) {
        return res;
      }

      let data;
      let blockhash = height;
      if (isNumeric(height)) {
        blockhash = await rpcClients[blockchain].request("getblockhash", [
          Number(height),
        ]);
      }

      data = await rpcClients[blockchain].request("getblock", {
        blockhash,
        verbosity: 2,
      });

      if (data.message || data?.code === 500) {
        throw new Error(data.message);
      }

      redisClient.json.set(redisRef, "$", data);
      redisClient.EXPIRE(redisRef, 60 * 5);

      return data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  public async getBlockByHash(
    blockchain: string,
    blockhash: string,
    verbosity: number
  ) {
    try {
      await connect();
      const redisRef = `rpc:${blockchain}:getblock:${blockhash}:${verbosity}`;
      const res = await redisClient.json.get(redisRef);

      if (res && res?.status !== 500) {
        return res;
      }

      const data = await rpcClients[blockchain].request("getblock", {
        blockhash,
        verbosity: verbosity ? Number(verbosity) : 0,
      });
      if (data.message || data?.code === 500) {
        throw new Error(data.message);
      }
      redisClient.json.set(redisRef, "$", data);
      redisClient.EXPIRE(redisRef, 60 * 5);
      return data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  private async getBlockCount(blockchain: string) {
    try {
      const redisRef = `rpc:${blockchain}:getblockcount`;
      const res = await redisClient.json.get(redisRef);
      if (res && res?.status !== 500) {
        return res;
      }
      const data = await rpcClients[blockchain].request("getblockcount");
      if (data.message || data?.code === 500) {
        throw new Error(data.message);
      }
      redisClient.json.set(redisRef, "$", data);
      redisClient.EXPIRE(redisRef, 60 * 5);
      return data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  public async getBlocks({
    blockchain,
    limit,
    offset,
  }: {
    blockchain: string;
    limit: number;
    offset: number;
  }) {
    try {
      await connect();
      const redisRef = `rpc:${blockchain}:getblocks:${offset}:${limit}`;
      const res = await redisClient.json.get(redisRef);

      if (
        (res && res?.status !== 500) ||
        (Array.isArray(res) && res.length > 0)
      ) {
        return res;
      }

      const blockCount = await this.getBlockCount(blockchain);

      limit = Math.min(limit, 20);
      const startBlock = Math.max(blockCount - offset * limit, 0);
      const endBlock = Math.max(startBlock - limit + 1, 0);

      if (
        startBlock < 0 ||
        endBlock < 0 ||
        startBlock > blockCount ||
        endBlock > blockCount
      ) {
        throw new Error("Offset out of range");
      }

      const promises: Promise<any>[] = [];
      for (let height = startBlock; height >= endBlock; height--) {
        promises.push(this.getBlockByHeight(blockchain, height.toString()));
      }

      const blocks = await Promise.all(promises);
      redisClient.json.set(redisRef, "$", blocks);
      redisClient.EXPIRE(redisRef, 60 * 5);

      return blocks;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BlockService();
