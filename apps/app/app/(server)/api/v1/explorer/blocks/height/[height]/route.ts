import { handleError, handleResponse } from "@/_api/validation";
import { NextRequest } from "next/server";
import rpcClients from "~/_api/rpcClient";
import { ApiBlockHeight } from ".";
import { connect, redisClient, disconnect } from "@/_lib/redis";

export async function GET(
  request: NextRequest,
  { params: { height } }: { params: { height: string | number } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");

    if (!blockchain) {
      return Response.json({ message: "Missing blockchain query" });
    }

    await connect();

    const redisRef = `rpc:${blockchain}:getblockhash:${height}`;
    const res = await redisClient.json.get(redisRef);

    if (res) {
      return handleResponse<ApiBlockHeight>(res);
    }

    const data = await rpcClients[blockchain].request("getblockhash", [
      Number(height),
    ]);
    if (data.message) {
      throw new Error(data.message);
    }
    redisClient.json.set(redisRef, "$", data);
    redisClient.EXPIRE(redisRef, 60 * 5);
    return handleResponse<any>(data);
  } catch (err) {
    await disconnect()
    return handleError(err as Error);
  }
}
