import { connect, redisClient } from "@/_lib/redis";
import { type NextRequest } from "next/server";
import { config } from "~/_config";

export async function GET(request: NextRequest): Promise<any> {
  const searchParams = request.nextUrl.searchParams;
  const blockchain = searchParams.get("blockchain");

  if (!blockchain) {
    return Response.json({ message: "Missing blockchain query" });
  }

  const chain = config.blockchains.chains[blockchain];
  try {
    await connect();
    const redisRef = `market:${blockchain}:charts`;
    const redisRef1 = `market:${blockchain}:charts_ohlc`;
    const res = await redisClient.json.get(redisRef);
    const res1 = await redisClient.json.get(redisRef1);

    if (res && res?.status !== 500 && res1 && res1?.status !== 500) {
      return Response.json({ ...res, ohlc: res1 }, { status: 200 });
    }

    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${chain.coinGeckoCoin}/market_chart?vs_currency=usd&days=30`
    ).then((res) => res.json());
    redisClient.json.set(redisRef, "$", data);
    redisClient.EXPIRE(redisRef, 60 * 60 * 1000);

    const dataOhlc = await fetch(
      `https://api.coingecko.com/api/v3/coins/${chain.coinGeckoCoin}/ohlc?vs_currency=usd&days=30`
    ).then((res) => res.json());
    redisClient.json.set(redisRef1, "$", dataOhlc);
    redisClient.EXPIRE(redisRef1, 60 * 60 * 1000);
    return Response.json({ ...data, ohlc: dataOhlc }, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
