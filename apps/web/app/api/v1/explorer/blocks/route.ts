import BlockService from "@/_services/block.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<any> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");
    const offset = Number(searchParams.get("offset") ?? "0");
    const limit = Number(searchParams.get("limit") ?? "10");

    if (!blockchain) {
      return Response.json({ message: "Missing required params" });
    }

    const blocks = await BlockService.getBlocks({ blockchain, offset, limit });

    return Response.json(blocks, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
