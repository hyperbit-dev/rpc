import { NextResponse } from "next/server";
import { rpcClients } from "@/lib/rpc";

/**
 * @swagger
 * /api/v1/{blockchain}/transactions/{txid}:
 *    get:
 *      tags:
 *        - Transactions
 *      parameters:
 *        - name: blockchain
 *          in: path
 *          description: Valid blockchain symbol
 *          schema:
 *            type: string
 *            example: btc
 *        - name: id
 *          in: path
 *          description: Valid transaction id
 *          schema:
 *            type: string
 *            example: f0ddabe84e780b46779b4596a4cb620fc130b99cce89893a3a186298a01f765a
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
export async function GET(
  _request: Request,
  {
    params: { txid, blockchain },
  }: { params: { txid: string; blockchain: string } }
) {
  try {
    const data = await rpcClients[blockchain].request("getrawtransaction", {
      txid,
      verbose: true,
    });
    if (data.status === 500) {
      return NextResponse.json(data, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
