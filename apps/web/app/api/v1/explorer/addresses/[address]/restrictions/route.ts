import rpcClients from "@/_api/rpcClient";
import { handleError, handleResponse } from "@/_api/validation";
import { blockchainSchema } from "@/_config";
import { connect, disconnect, redisClient } from "@/_lib/redis";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> },
) {
  try {
    const address = (await params).address;
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");

    if (!blockchain) {
      return Response.json({ message: "Missing blockchain query" });
    }

    blockchainSchema.parse({ blockchain });

    await connect();
    const redisRef = `rpc:${blockchain}:listaddressrestrictions:${address}`;
    const res = await redisClient.json.get(redisRef);

    if (res && res?.status !== 500) {
      return handleResponse<any>(res);
    }

    const data = await rpcClients[blockchain].request(
      "listaddressrestrictions",
      [address],
    );

    if (data.message || data?.code === 500) {
      throw new Error(data.message);
    }
    redisClient.json.set(redisRef, "$", data);
    redisClient.EXPIRE(redisRef, 60 * 5 * 1000);
    return handleResponse<any>(data);
  } catch (err) {
    let message = "Internal server error";
    // @ts-ignore
    if (err?.message === "No information available for address") {
      // @ts-ignore
      message = err.message;
    }
    return Response.json({ message }, { status: 500 });
  }
}
