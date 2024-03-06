import rpcClients from "@/_api/rpcClient";
import { handleError, handleResponse } from "@/_api/validation";
import { NextRequest } from "next/server";
import { ApiAddressBalance } from "./types";
import { blockchainSchema } from "@/_config";
import { connect, disconnect, redisClient } from "@/_lib/redis";

export async function GET(
  request: NextRequest,
  { params: { address } }: { params: { address: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");

    if (!blockchain) {
      return Response.json({ message: "Missing blockchain query" });
    }

    blockchainSchema.parse({ blockchain });

    await connect();
    const redisRef = `rpc:${blockchain}:getaddressbalance:${address}`;
    const res = await redisClient.json.get(redisRef);

    if (res) {
      return handleResponse<ApiAddressBalance>(res);
    }

    const data = await rpcClients[blockchain].request("getaddressbalance", [
      address,
    ]);

    if (data.message) {
      throw new Error(data.message);
    }
    redisClient.json.set(redisRef, "$", data);
    redisClient.EXPIRE(redisRef, 60 * 5);
    return handleResponse<ApiAddressBalance>(data);
  } catch (err) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}
