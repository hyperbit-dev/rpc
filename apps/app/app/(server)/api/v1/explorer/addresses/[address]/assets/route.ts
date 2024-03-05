import rpcClients from "@/_api/rpcClient";
import { handleError, handleResponse } from "@/_api/validation";
import { blockchainSchema, config } from "@/_config";
import { connect, disconnect, redisClient } from "@/_lib/redis";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params: { address },
  }: {
    params: {
      address: string;
    };
  }
): Promise<any> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");

    if (!blockchain) {
      return Response.json({ message: "Missing blockchain query" });
    }

    blockchainSchema.parse({ blockchain });

    const chain = config.blockchains.chains[blockchain];
    if (!chain.features.assetsEnabled) {
      return Response.json({ message: "Not Implemented" }, { status: 501 });
    }
    // const body = [address, onlytotal ?? false, count ?? 50000, start ?? 0];
    const body = [address, false, 50000, 0];

    await connect();
    const redisRef = `rpc:${blockchain}:listassetbalancesbyaddress:${address}`;
    const res = await redisClient.json.get(redisRef);

    if (res) {
      return handleResponse<any>(res);
    }

    const data = await rpcClients[blockchain].request(
      "listassetbalancesbyaddress",
      body
    );

    if (data.message) {
      throw new Error(data.message);
    }
    redisClient.json.set(redisRef, "$", data);
    redisClient.EXPIRE(redisRef, 60 * 5);
    return handleResponse<any>(data);
  } catch (err) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}
