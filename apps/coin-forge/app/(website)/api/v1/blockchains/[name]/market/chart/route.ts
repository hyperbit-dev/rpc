export async function GET(
  _req: Request,
  { params: { name } }: { params: { name: string } }
): Promise<any> {
  try {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=30`
    ).then((res) => res.json());
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
