import { connect, redisClient } from "@/_lib/redis";
import { type NextRequest } from "next/server";
import { config } from "~/_config";

function getLastEntryPerDay(data: any[]) {
  const dailyData: { [key: string]: any } = {};

  // Group data by day
  data.forEach((entry: any) => {
    const date = new Date(entry[0]).toISOString().split("T")[0];
    dailyData[date] = entry; // Store only the last entry for each date
  });

  // Convert dailyData back into an array of entries
  return Object.values(dailyData);
}

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
    let res = await redisClient.json.get(redisRef);
    let res1 = await redisClient.json.get(redisRef1);

    if (!res || res?.status === 500) {
      res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${chain.coinGeckoCoin}/market_chart?vs_currency=usd&days=30`
      ).then((res) => res.json());
      if (!res.status && !res.error) {
        res.market_caps = getLastEntryPerDay(res.market_caps);
        res.total_volumes = getLastEntryPerDay(res.total_volumes);
        res.prices = getLastEntryPerDay(res.prices);
        redisClient.json.set(redisRef, "$", res);
        redisClient.EXPIRE(redisRef, 86400);
      } else {
        throw new Error(res.error || res.status);
      }
    }

    if (!res1 || res1?.status === 500) {
      res1 = await fetch(
        `https://api.coingecko.com/api/v3/coins/${chain.coinGeckoCoin}/ohlc?vs_currency=usd&days=30`
      ).then((res) => res.json());
      if (!res1.status && !res1.error) {
        res1 = getLastEntryPerDay(res1);
        redisClient.json.set(redisRef1, "$", res1);
        redisClient.EXPIRE(redisRef1, 86400);
      } else {
        res1 = [];
      }
    }

    return Response.json({ ...res, ohlc: res1 }, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
