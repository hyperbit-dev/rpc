import TransactionService from "@/_services/transaction.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<any> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");
    const skip = Number(searchParams.get("skip") ?? "0");
    const count = Number(searchParams.get("count") ?? "20");

    if (!blockchain) {
      return Response.json({ message: "Missing required params" });
    }

    const transactions = await TransactionService.getTransactions({
      blockchain,
      skip,
      count,
    });

    return Response.json(transactions, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
