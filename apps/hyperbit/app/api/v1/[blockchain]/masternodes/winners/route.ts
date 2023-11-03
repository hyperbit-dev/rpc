
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { config } from "@/lib/config";

/**
 * @swagger
 * /api/v1/{blockchain}/masternodes/winners:
 *    get:
 *      tags:
 *        - Masternodes
 *      description: If enabled on the blockchain, print list of masternode winners.
 *      parameters:
 *        - name: blockchain
 *          in: path
 *          description: Valid blockchain symbol
 *          schema:
 *            type: string
 *            example: pgn
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  2746702:
 *                    type: string
 *                    example: PSWQpimCSyCuPBfGUdegnm1Gewn8ef648g
 */
export async function GET(
  request: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
): Promise<any> {
  const chain = config.chains[blockchain];
  if (!chain.features.masternodesEnabled) {
    return Response.json({ message: "Not Implemented" }, { status: 501 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const count = searchParams.get("count");
    const filter = searchParams.get("filter");
    const params: string[] = ["winners"];
    if (count) {
      if(Number(count) > 1000) {
        params.push('1000');
      } else {
        params.push(count);
      }
    }
    if (filter) params.push(filter);
    const data = await rpcClients[blockchain].request("masternode", params);
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
