import rpcClients from "~/_api/rpcClient";
import { connect, redisClient } from "@/_lib/redis";

class AssetService {
  async listAssets({
    blockchain,
    name = "*",
    count,
    start,
  }: {
    blockchain: string;
    name?: string;
    count: number;
    start: number;
  }) {
    try {
      count = Math.min(count, 25);
      await connect();
      const redisRef = `rpc:${blockchain}:getassets:${start}:${count}:${name}`;
      const res = await redisClient.json.get(redisRef);

      if (
        (res && res?.status !== 500) ||
        (Array.isArray(res) && res.length > 0)
      ) {
        return res;
      }

      const assets = await rpcClients[blockchain].request("listassets", [
        name,
        true,
        count,
        start,
      ]);
      return assets;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AssetService();
