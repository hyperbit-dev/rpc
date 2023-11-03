import { NextApiRequest } from "next";
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { GetBlockchainInfoResponse } from "@/types/api/v1/blockchain";

export async function GET(
  _req: NextApiRequest,
  {
    params,
  }: {
    params: {
      blockchain: string;
    };
  }
): Promise<any> {
  try {
    const data = await rpcClients[params.blockchain].request(
      "getblockchaininfo"
    );
    if (data?.status === 500) {
      throw new Error(data?.message);
    }
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
