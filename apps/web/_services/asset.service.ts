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

      const data = await rpcClients[blockchain].request("listassets", [
        name,
        true,
        count,
        start,
      ]);

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

  async listAddressesByAsset({
    blockchain,
    asset_name,
    onlytotal = false,
    count = 25,
    start = 0,
  }: {
    blockchain: string;
    asset_name: string;
    onlytotal?: boolean;
    count: number;
    start: number;
  }) {
    try {
      count = Math.min(count, 25);
      await connect();
      const redisRef = `rpc:${blockchain}:listaddressesbyasset:${start}:${count}:${asset_name}:${onlytotal}`;
      const res = await redisClient.json.get(redisRef);

      if (
        (res && res?.status !== 500) ||
        (Array.isArray(res) && res.length > 0)
      ) {
        return res;
      }

      const body = [asset_name, onlytotal ?? false, count, start];
      const data = await rpcClients[blockchain].request(
        "listaddressesbyasset",
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
export default new AssetService();
