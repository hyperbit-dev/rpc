import { type NextRequest } from "next/server";
import { handleResponse } from "@/_api/validation";
import marketService from "@/_services/market.service";

export type ApiMarketLatest = {
  price: number;
  marketCap: number;
  totalVolume: number;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const blockchain = searchParams.get("blockchain");

  if (!blockchain) {
    return Response.json({ message: "Missing blockchain query" });
  }

  try {
    const marketData = await marketService.getMarketData(blockchain);
    return handleResponse<ApiMarketLatest>(marketData);
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
