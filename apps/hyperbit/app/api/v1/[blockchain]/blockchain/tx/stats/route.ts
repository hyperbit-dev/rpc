import { NextResponse } from "next/server";
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { GetChainTxStatsResponse } from "@/types/api/v1/blockchain";

export async function GET(
  _req: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
): Promise<NextResponse<GetChainTxStatsResponse | ResponseError>> {
  try {
    const data = await rpcClients[blockchain].request("getchaintxstats", {});
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
