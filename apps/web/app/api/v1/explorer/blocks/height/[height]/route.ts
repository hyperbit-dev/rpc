import { handleError, handleResponse } from "@/_api/validation";
import { NextRequest } from "next/server";
import rpcClients from "~/_api/rpcClient";
import { ApiBlockHeight } from ".";
import { connect, redisClient } from "@/_lib/redis";

function isNumeric(value: string) {
  return /^\d+$/.test(value);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ height: string }> },
) {
  try {
    const height = (await params).height;
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");

    if (!blockchain) {
      return Response.json({ message: "Missing blockchain query" });
    }

    await connect();

    const redisRef = `rpc:${blockchain}:getblockhash:${height}`;
    const res = await redisClient.json.get(redisRef);

    if (res && res?.status !== 500) {
      return handleResponse<ApiBlockHeight>(res);
    }

    let data;
    if (isNumeric(height)) {
      data = await rpcClients[blockchain].request("getblockhash", [
        Number(height),
      ]);
    } else {
      data = await rpcClients[blockchain].request("getblock", {
        blockhash: height,
        verbosity: 2,
      });
    }

    if (data.message || data?.code === 500) {
      throw new Error(data.message);
    }
    redisClient.json.set(redisRef, "$", data);
    redisClient.EXPIRE(redisRef, 60 * 5);
    return handleResponse<any>(data);
  } catch (err) {
    return handleError(err as Error);
  }
}
