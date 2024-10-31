import { type NextRequest } from "next/server";
import { config } from "~/_config";
import { connect, redisClient } from "@/_lib/redis";

export async function GET(request: NextRequest): Promise<any> {
  const searchParams = request.nextUrl.searchParams;
  const blockchain = searchParams.get("blockchain");

  if (!blockchain) {
    return Response.json({ message: "Missing blockchain query" });
  }

  const chain = config.blockchains.chains[blockchain];

  try {
    await connect();
    const redisRef = `market:${blockchain}`;
    const res = await redisClient.json.get(redisRef);

    if (res && res?.status !== 500) {
      return Response.json(res, { status: 200 });
    }

    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${chain.coinGeckoCoin}?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
    ).then((res) => res.json());
    redisClient.json.set(redisRef, "$", data);
    redisClient.EXPIRE(redisRef, 60 * 5);
    return Response.json(data, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
