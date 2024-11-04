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
      if (isNumeric(height)) {
        data = await rpcClients[blockchain].request("getblockhash", [
          Number(height),
        ]);
      } else {
        data = await rpcClients[blockchain].request("getblock", {
          blockhash: height,
          verbosity: 2,
        });
      }

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
  }
  catch(err: Error) {
    throw new Error(err.message);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BlockService();
