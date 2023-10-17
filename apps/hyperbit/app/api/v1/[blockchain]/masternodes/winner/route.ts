import { NextResponse } from "next/server";
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { config } from "@/lib/config";

/**
 * @swagger
 * /api/v1/{blockchain}/masternodes/winner:
 *    get:
 *      tags:
 *        - Masternodes
 *      description: If enabled on the blockchain, print info on next masternode winner to vote for.
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
 *                  height:
 *                    type: number
 *                    example: 2746725
 *                  IP:port:
 *                    type: string
 *                    example: 38.242.138.153:8757
 *                  proTxHash:
 *                    type: string
 *                    example: 3cd2ff90624b63b049a6c9c3f2b131f290cb5d91ea37212acb02d52a0c21712d
 *                  outpoint:
 *                    type: string
 *                    example: 3c42535450980737a45400571fdb7161cd133c687e4ff24a3fc18c91c9d64caa-0
 *                  payee:
 *                    type: string
 *                    example: PVvGUWsPSiFVKXCG6mCtMxYYU9FVF5LA45
 */
export async function GET(
  _req: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
): Promise<NextResponse<any | ResponseError>> {
  const chain = config.chains[blockchain];
  if (!chain.features.masternodesEnabled) {
    return NextResponse.json({ message: "Not Implemented" }, { status: 501 });
  }

  try {
    const data = await rpcClients[blockchain].request("masternode", ['winner']);
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
