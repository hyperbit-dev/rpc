
import { rpcClients } from "@/lib/rpc";

export async function POST(
  request: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
) {
  const { asset_name, onlytotal, count, start } = await request.json();
  const data = [
    asset_name.toUpperCase(),
    onlytotal ?? false,
    count ?? 50000,
    start ?? 0,
  ];
  try {
    const res = await rpcClients[blockchain].request(
      "listaddressesbyasset",
      data
    );
    if (res.status === 500) {
      throw new Error(res.message);
    }
    return Response.json(res, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
