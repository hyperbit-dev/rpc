import { NextResponse } from "next/server";
import { rpcClients } from "@/lib/rpc";

/**
 * @swagger
 * /api/v1/{blockchain}/blocks/height/{height}:
 *    get:
 *      tags:
 *        - Blocks
 *      description: Returns hash of block in best-block-chain at height provided.
 *      parameters:
 *        - name: blockchain
 *          in: path
 *          description: Valid blockchain symbol
 *          schema:
 *            type: string
 *            example: btc
 *        - name: height
 *          in: path
 *          description: Valid block height
 *          schema:
 *            type: number
 *            example: 1133851
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: 0000001f6a7c80d0500e5612b639cd4bdfa05cfed2cb131d79c26fdbbd42bea5
 */
export async function GET(
  _request: Request,
  {
    params: { height, blockchain },
  }: { params: { height: string | number; blockchain: string } }
) {
  try {
    const data = await rpcClients[blockchain].request("getblockhash", [
      Number(height),
    ]);
    console.log("data", data);
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
