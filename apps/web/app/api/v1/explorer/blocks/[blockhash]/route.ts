import rpcClients from "~/_api/rpcClient";
import { handleError, handleResponse } from "~/_api/validation";
import { ApiBlock } from "./types";
import { blockchainSchema } from "@/_config";
import { z } from "zod";
import { connect, redisClient, disconnect } from "@/_lib/redis";

const schema = z.object({
  verbosity: z.number().gte(0).lte(2).optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ blockhash: string }> },
) {
  try {
    const blockhash = (await params).blockhash;
    const { searchParams } = new URL(request.url);
    const verbosity = Number(searchParams.get("verbosity"));
    const blockchain = searchParams.get("blockchain");

    if (!blockchain) {
      return Response.json({ message: "Missing blockchain query" });
    }

    schema.parse({ verbosity });
    blockchainSchema.parse({ blockchain });

    await connect();
    const redisRef = `rpc:${blockchain}:getblock:${blockhash}:${verbosity}`;
    const res = await redisClient.json.get(redisRef);

    if (res && res?.status !== 500) {
      return handleResponse<ApiBlock>(res);
    }

    const data = await rpcClients[blockchain].request("getblock", {
      blockhash,
      verbosity: verbosity ? Number(verbosity) : 0,
    });
    if (data.message || data?.code === 500) {
      throw new Error(data.message);
    }
    redisClient.json.set(redisRef, "$", data);
    redisClient.EXPIRE(redisRef, 60 * 5);
    return handleResponse<ApiBlock>(data);
  } catch (err) {
    return handleError(err as Error);
  }
}
