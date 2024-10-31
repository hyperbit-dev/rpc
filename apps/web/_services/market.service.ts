import { config } from "~/_config";
import { connect, redisClient } from "@/_lib/redis";

class MarketService {
  public async getMarketData(blockchain: string) {
    const chain = config.blockchains.chains[blockchain];

    try {
      await connect();
      const redisRef = `market:${blockchain}:latest`;
      const res = await redisClient.json.get(redisRef);

      if (res && res?.status !== 500) {
        return res;
      }

      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${chain.coinGeckoCoin}/market_chart?vs_currency=usd&days=1&interval=daily`
      ).then((res) => res.json());
      if (data.error) {
        throw new Error(data.error);
      }

      const price = data.prices[data.prices.length - 1][1];
      const marketCap = data.market_caps[data.market_caps.length - 1][1];
      const totalVolume = data.total_volumes[data.total_volumes.length - 1][1];

      if (data.message || data?.code === 500) {
        throw new Error(data.message);
      }

      redisClient.json.set(redisRef, "$", { price, marketCap, totalVolume });
      redisClient.EXPIRE(redisRef, 10 * 6 * 1000);
      return { price, marketCap, totalVolume };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new MarketService();
