import rpcClients from "@/_api/rpcClient";
import { config } from "@/_lib/config";
import { connect, disconnect, redisClient } from "@/_lib/redis";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ asset: string }> },
): Promise<any> {
  const asset = (await params).asset;
  const searchParams = req.nextUrl.searchParams;
  const blockchain = searchParams.get("blockchain") as string;
  const assetName = asset.split("-").join("/");
  const chain = config.chains[blockchain];
  if (!chain.features.assetsEnabled) {
    return Response.json({ message: "Not Implemented" }, { status: 501 });
  }

  try {
    await connect();
    const redisRef = `rpc:${blockchain}:getassetdata:${assetName.toUpperCase()}`;
    const res = await redisClient.json.get(redisRef);

    if (res && res?.status !== 500) {
      return Response.json(res, { status: 200 });
    }

    const data = await rpcClients[blockchain].request("getassetdata", {
      asset_name: assetName.toUpperCase(),
    });
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    redisClient.json.set(redisRef, "$", data);
    redisClient.EXPIRE(redisRef, 60 * 5);
    return Response.json(data, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
