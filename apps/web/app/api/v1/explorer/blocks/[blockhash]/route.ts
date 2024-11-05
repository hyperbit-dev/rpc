import rpcClients from "~/_api/rpcClient";
import { handleResponse } from "~/_api/validation";
import { ApiBlock } from "./types";
import { blockchainSchema } from "@/_config";
import { z } from "zod";
import { connect, redisClient } from "@/_lib/redis";
import BlockService from "@/_services/block.service";

const schema = z.object({
  verbosity: z.number().gte(0).lte(2).optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ blockhash: string }> }
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

    const data = await BlockService.getBlockByHash(
      blockchain,
      blockhash,
      verbosity
    );
    return handleResponse(data);
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
