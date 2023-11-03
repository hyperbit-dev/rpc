
import { rpcClients } from "@/lib/rpc";

/**
 * @swagger
 * /api/v1/{blockchain}/addresses/{address}/txids:
 *    get:
 *      tags:
 *        - Addresses
 *      description: Returns the transactions for an address(es).
 *      parameters:
 *        - name: blockchain
 *          in: path
 *          description: Valid blockchain symbol
 *          schema:
 *            type: string
 *            example: btc
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
 *               type: array
 *               items:
 *                 type: string
 *                 example: 04fc983a5ffc7cb49a6dad73dd2b33ef2b836e800371f5ad33153ecaa2efcd10
 */
export async function GET(
  _request: Request,
  {
    params: { address, blockchain },
  }: { params: { address: string; blockchain: string } }
) {
  try {
    const data = await rpcClients[blockchain].request("getaddresstxids", [
      {
        addresses: [address],
      },
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
