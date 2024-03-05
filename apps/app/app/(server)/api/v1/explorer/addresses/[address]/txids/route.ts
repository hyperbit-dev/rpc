import rpcClients from "@/_api/rpcClient";
import { handleError, handleResponse } from "@/_api/validation";
import { blockchainSchema } from "@/_config";
import { connect, disconnect, redisClient } from "@/_lib/redis";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { address } }: { params: { address: string } }
) {
  // let parsed =
  // Object.keys(params).length === 1 && params.addresses.length
  //   ? Object.values(params).flat()
  //   : params;
  try {
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");

    if (!blockchain) {
      return Response.json({ message: "Missing blockchain query" });
    }

    blockchainSchema.parse({ blockchain });

    await connect();
    const redisRef = `rpc:${blockchain}:getaddresstxids:${address}`;
    const res = await redisClient.json.get(redisRef);

    if (res) {
      return handleResponse<any>(res);
    }

    const data = await rpcClients[blockchain].request("getaddresstxids", [
      {
        addresses: [address],
      },
    ]);

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
