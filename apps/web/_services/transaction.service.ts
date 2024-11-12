import rpcClients from "~/_api/rpcClient";
import { connect, redisClient } from "@/_lib/redis";

class TransactionService {
  public async getTransactions({
    blockchain,
    count = 20,
    skip = 0,
  }: {
    blockchain: string;
    count: number;
    skip: number;
  }) {
    try {
      await connect();
      const redisRef = `rpc:${blockchain}:listtransactions:${skip}:${count}`;
      const res = await redisClient.json.get(redisRef);

      if (
        (res && res?.status !== 500) ||
        (Array.isArray(res) && res.length > 0)
      ) {
        return res;
      }

      count = Math.min(count, 20);

      const body = { account: "*", count, skip };
      const data = await rpcClients[blockchain].request(
        "listtransactions",
        body
      );

      if (!data || data?.code === 500) {
        throw new Error(data.message);
      }

      redisClient.json.set(redisRef, "$", data);
      redisClient.EXPIRE(redisRef, 60 * 5 * 1000);

      return data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TransactionService();
