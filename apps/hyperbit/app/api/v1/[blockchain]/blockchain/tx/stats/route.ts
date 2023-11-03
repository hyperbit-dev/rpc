
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { GetChainTxStatsResponse } from "@/types/api/v1/blockchain";

export async function GET(
  _req: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
): Promise<Response<GetChainTxStatsResponse | ResponseError>> {
  try {
    const data = await rpcClients[blockchain].request("getchaintxstats", {});
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
