import { NextRequest } from "next/server";
import rpcClients from "~/_api/rpcClient";
import { handleError, handleResponse } from "~/_api/validation";
import { ApiRawMempool } from "./types";
import { blockchainSchema } from "@/_config";
import { connect, redisClient, disconnect } from "@/_lib/redis";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");

    if (!blockchain) {
      return Response.json({ message: "Missing blockchain query" });
    }

    blockchainSchema.parse({ blockchain });

    await connect();
    const redisRef = `rpc:${blockchain}:getrawmempool`;
    const res = await redisClient.json.get(redisRef);

    if (res) {
      return handleResponse<ApiRawMempool>(res);
    }

    const data = await rpcClients[blockchain].request("getrawmempool", {});

    if (data.message) {
      throw new Error(data.message);
    }

    redisClient.json.set(redisRef, "$", data);
    redisClient.EXPIRE(redisRef, 60);
    return handleResponse<any>(data);
  } catch (err) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}
