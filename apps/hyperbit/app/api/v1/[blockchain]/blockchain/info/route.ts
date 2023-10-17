import { NextRequest, NextResponse } from "next/server";
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { GetBlockchainInfoResponse } from "@/types/api/v1/blockchain";

export async function GET(
  _req: NextRequest,
  {
    params,
  }: {
    params: {
      blockchain: string;
    };
  }
): Promise<NextResponse<GetBlockchainInfoResponse | ResponseError>> {
  try {
    const data = await rpcClients[params.blockchain].request(
      "getblockchaininfo"
    );
    if (data?.status === 500) {
      throw new Error(data?.message);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
