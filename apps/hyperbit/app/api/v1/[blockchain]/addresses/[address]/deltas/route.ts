import { NextResponse } from "next/server";
import { rpcClients } from "@/lib/rpc";

/**
 * @swagger
 * /api/v1/{blockchain}/addresses/{address}/deltas:
 *    get:
 *      tags:
 *        - Addresses
 *      description: Returns all changes for an address.
 *      parameters:
 *        - name: blockchain
 *          in: path
 *          description: Valid blockchain symbol
 *          schema:
 *            type: string
 *            example: btc
 *        - name: address
 *          in: path
 *          description: Valid blockchain address
 *          schema:
 *            type: string
 *            example: n1Mtr9gfUe9eMxXiSbR4Hm3wVNkcZiqKhE
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  assetName:
 *                    type: string
 *                    example: RVN
 *                  satoshis:
 *                    type: number
 *                    example: 500000000000
 *                  txid:
 *                    type: string
 *                    example: 04fc983a5ffc7cb49a6dad73dd2b33ef2b836e800371f5ad33153ecaa2efcd10
 *                  index:
 *                    type: number
 *                    example: 0
 *                  blockindex:
 *                    type: number
 *                    example: 0
 *                  height:
 *                    type: number
 *                    example: 1121275
 *                  address:
 *                    type: string
 *                    example: mpBHpSx1UUEd3LU5G8Q4Ui5LfN5CvxKvdY
 */
export async function GET(
  _request: Request,
  {
    params: { address, blockchain },
  }: { params: { address: string; blockchain: string } }
) {
  try {
    const data = await rpcClients[blockchain].request("getaddressdeltas", [
      {
        addresses: [address],
      },
    ]);
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
