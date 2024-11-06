import { config } from "@/_lib/config";
import AssetService from "@/_services/asset.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<any> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain") as string;
    const asset_name = searchParams.get("asset") ?? "";
    const start = Number(searchParams.get("start") ?? "0");
    const count = Number(searchParams.get("count") ?? "25");

    if (!blockchain || !asset_name) {
      return Response.json({ message: "Missing required params" }, { status: 400 });
    }

    const chain = config.chains[blockchain];
    if (!chain.features.assetsEnabled) {
      return Response.json({ message: "Not Implemented" }, { status: 501 });
    }

    const data = await AssetService.listAddressesByAsset({
      blockchain,
      asset_name,
      start,
      count,
    });

    return Response.json(data, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
