import rpcClients from "@/_api/rpcClient";
import { config } from "@/_lib/config";
import { connect, disconnect, redisClient } from "@/_lib/redis";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { asset } }: { params: { asset: string } }
): Promise<any> {
  const searchParams = req.nextUrl.searchParams;
  const blockchain = searchParams.get("blockchain") as string;
  const chain = config.chains[blockchain];
  if (!chain.features.assetsEnabled) {
    return Response.json({ message: "Not Implemented" }, { status: 501 });
  }

  // const body = [asset_name, onlytotal ?? false, count ?? 50000, start ?? 0];
  const body = [asset.toUpperCase(), false, 50000, 0];
  try {
    await connect();
    const redisRef = `rpc:${blockchain}:listaddressesbyasset:${asset.toUpperCase()}`;
    const res = await redisClient.json.get(redisRef);

    if (res) {
      return Response.json(res, { status: 200 });
    }

    const data = await rpcClients[blockchain].request(
      "listaddressesbyasset",
      body
    );
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    redisClient.json.set(redisRef, "$", data);
    redisClient.EXPIRE(redisRef, 60 * 5);
    return Response.json(data, { status: 200 });
  } catch (err) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}
