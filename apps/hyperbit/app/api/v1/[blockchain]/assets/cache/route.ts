
import { rpcClients } from "@/lib/rpc";

export async function GET(
  _request: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
) {
  try {
    const res = await rpcClients[blockchain].request("getcacheinfo");
    if (res.status === 500) {
      throw new Error(res.message);
    }
    return Response.json(res, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
