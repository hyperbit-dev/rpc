import { NextResponse } from "next/server";
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
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
