import { NextResponse } from "next/server";
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";

/**
 * @swagger
 * /api/v1/{blockchain}/blocks/besthash:
 *    get:
 *      tags:
 *        - Blocks
 *      description: Returns the hash of the best (tip) block in the longest blockchain.
 *      parameters:
 *        - name: blockchain
 *          in: path
 *          description: Valid blockchain symbol
 *          schema:
 *            type: string
 *            example: btc
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: 00000002aa22bb33f7a9276e1621a98c87d474867d70bab5a311da60c4eac78a
 */
export async function GET(
  _req: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
): Promise<NextResponse<string | ResponseError>> {
  try {
    const data = await rpcClients[blockchain].request("getbestblockhash");
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
