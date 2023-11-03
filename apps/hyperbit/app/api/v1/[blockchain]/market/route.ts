
import { ResponseError } from "@/types/api";
import { config } from "@/lib/config";

export async function GET(
  _req: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
): Promise<any> {
  const chain = config.chains[blockchain];
  try {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${chain.coinGeckoCoin}?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
    ).then((res) => res.json());
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
