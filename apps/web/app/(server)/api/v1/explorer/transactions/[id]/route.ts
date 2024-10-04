import { NextRequest } from "next/server";
import rpcClients from "~/_api/rpcClient";
import { handleError, handleResponse } from "~/_api/validation";
import { ApiRawTransaction } from "./types";
import { blockchainSchema } from "@/_config";
import { connect, redisClient } from "@/_lib/redis";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");

    if (!blockchain) {
      return Response.json({ message: "Missing blockchain query" });
    }

    blockchainSchema.parse({ blockchain });

    await connect();
    const redisRef = `rpc:${blockchain}:getrawtransaction:${id}:verbose:${1}`;
    const res = await redisClient.json.get(redisRef);

    if (res) {
      return handleResponse<ApiRawTransaction>(res);
    }

    const data = await rpcClients[blockchain].request("getrawtransaction", {
      txid: id,
      verbose: true,
    });

    if (data.message || data?.code === 500) {
      throw new Error(data.message);
    }
    redisClient.json.set(redisRef, "$", data);
    redisClient.EXPIRE(redisRef, 60 * 5);
    return handleResponse<any>(data);
  } catch (err) {
    let message = "Internal server error";
    if (
      // @ts-ignore
      err?.message ===
      "No such mempool transaction. Use -txindex to enable blockchain transaction queries. Use gettransaction for wallet transactions."
    ) {
      // @ts-ignore
      message = "No such mempool transaction.";
    }
    return Response.json({ message }, { status: 500 });
  }
}
