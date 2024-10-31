import { type NextRequest } from "next/server";
import { config } from "~/_config";
import { handleError, handleResponse } from "@/_api/validation";
import { connect, redisClient } from "@/_lib/redis";

export type ApiMarketLatest = {
  price: number;
  marketCap: number;
  totalVolume: number;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const blockchain = searchParams.get("blockchain");

  if (!blockchain) {
    return Response.json({ message: "Missing blockchain query" });
  }

  const chain = config.blockchains.chains[blockchain];

  try {
    await connect();
    const redisRef = `market:${blockchain}:latest`;
    const res = await redisClient.json.get(redisRef);

    if (res && res?.status !== 500) {
      return handleResponse<any>(res);
    }

    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${chain.coinGeckoCoin}/market_chart?vs_currency=usd&days=1&interval=daily`,
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
    redisClient.EXPIRE(redisRef, 60 * 5);
    return handleResponse<ApiMarketLatest>({ price, marketCap, totalVolume });
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
