import { handleResponse } from "@/_api/validation";
import { NextRequest } from "next/server";
import { ApiBlockHeight } from ".";
import blockService from "@/_services/block.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ height: string }> }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");
    const height = (await params).height;

    if (!blockchain) {
      return Response.json({ message: "Missing blockchain query" });
    }

    const data = await blockService.getBlockByHeight(blockchain, height);
    return handleResponse<ApiBlockHeight>(data);
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
