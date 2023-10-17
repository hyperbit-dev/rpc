import { NextResponse } from "next/server";
import { MarketLatest, ResponseError } from "@/types/api";
import { config } from "@/lib/config";

export async function GET(
  _req: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
): Promise<NextResponse<MarketLatest | ResponseError>> {
  const chain = config.chains[blockchain];
  try {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${chain.coinGeckoCoin}/market_chart?vs_currency=usd&days=1&interval=daily`
    ).then((res) => res.json());
    const price = data.prices[data.prices.length - 1][1];
    const marketCap = data.market_caps[data.market_caps.length - 1][1];
    const totalVolume = data.total_volumes[data.total_volumes.length - 1][1];
    return NextResponse.json(
      { price, marketCap, totalVolume },
      { status: 200 }
    );
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
