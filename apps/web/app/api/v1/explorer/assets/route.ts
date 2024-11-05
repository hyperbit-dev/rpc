import AssetService from "@/_services/asset.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<any> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");
    const name = searchParams.get("name") ?? "*";
    const start = Number(searchParams.get("start") ?? "0");
    const count = Number(searchParams.get("count") ?? "25");

    if (!blockchain) {
      return Response.json({ message: "Missing required params" });
    }

    const blocks = await AssetService.listAssets({
      blockchain,
      name,
      start,
      count,
    });

    return Response.json(blocks, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
