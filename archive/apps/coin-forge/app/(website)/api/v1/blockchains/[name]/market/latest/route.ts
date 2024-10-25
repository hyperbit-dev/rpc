import { getNetwork } from "@/_lib/blockchain";

export async function GET(
  _req: Request,
  { params: { name } }: { params: { name: string } },
): Promise<any> {
  try {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=1&interval=daily`,
    ).then((res) => res.json());
    const price = data.prices[data.prices.length - 1][1];
    const marketCap = data.market_caps[data.market_caps.length - 1][1];
    const totalVolume = data.total_volumes[data.total_volumes.length - 1][1];
    return Response.json({ price, marketCap, totalVolume }, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
