
import { rpcClients } from "@/lib/rpc";
import {
  AddressBalanceParams,
  AddressBalanceResponse,
  ResponseError,
} from "@/types/api";

/**
 * @swagger
 * /api/v1/{blockchain}/addresses/{address}/balance:
 *    get:
 *      tags:
 *        - Addresses
 *      description: Returns the balance for an address in satoshis.
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
 *                  balance:
 *                    type: integer
 *                    example: 544000000000000
 *                  received:
 *                    type: integer
 *                    example: 544000000000000
 */
export async function GET(
  _req: Request,
  { params: { address, blockchain } }: AddressBalanceParams
): Promise<any> {
  try {
    const data = await rpcClients[blockchain].request("getaddressbalance", [
      address,
    ]);
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
