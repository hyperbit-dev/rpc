import ExplorerService from "@/_services/explorer.service";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<any> {
  const searchParams = request.nextUrl.searchParams;
  const blockchain = searchParams.get("blockchain");

  if (!blockchain) {
    return Response.json({ message: "Missing blockchain query" });
  }

  try {
    const summary = await ExplorerService.getSummary(blockchain);
    console.log('summary', summary)
    return Response.json(summary);
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
