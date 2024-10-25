import { Client } from "@hyperbitjs/rpc";
import { z } from "zod";

export async function POST(
  request: Request,
  { params: { name } }: { params: { name: string } },
): Promise<any> {
  try {
    const blockchainSchema = z.enum(["rvn", "trvn"]);
    await blockchainSchema.parseAsync(name);
  } catch (error) {
    console.log("error", error);
    return new Response("Invalid blockchain", {
      status: 400,
    });
  }

  const rpcClient = new Client({
    url: process.env[`${name.toUpperCase()}_RPC_URL`]!,
    username: process.env[`${name.toUpperCase()}_RPC_USERNAME`]!,
    password: process.env[`${name.toUpperCase()}_RPC_PASSWORD`]!,
  });

  try {
    const bodySchema = z.object({
      method: z.enum([
        "getblockchaininfo",
        "getaddressbalance",
        "getaddressutxos",
      ]),
      params: z.any().optional(),
    });
    const body = await request.json();
    await bodySchema.parseAsync(body);

    const rpcResponse = await rpcClient.request(body.method, body.params);

    return Response.json({ data: rpcResponse }, { status: 200 });
  } catch (err) {
    console.log("err", err);
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
