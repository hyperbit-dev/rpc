
import { rpcClients } from "@/lib/rpc";

/**
 * @swagger
 * /api/v1/{blockchain}/addresses/{address}/utxos:
 *    get:
 *      tags:
 *        - Addresses
 *      description: Returns all unspent outputs for an address.
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
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                       example: n1Mtr9gfUe9eMxXiSbR4Hm3wVNkcZiqKhE
 *                     assetName:
 *                       type: string
 *                       example: RVN
 *                     txid:
 *                       type: string
 *                       example: 04fc983a5ffc7cb49a6dad73dd2b33ef2b836e800371f5ad33153ecaa2efcd10
 *                     outputIndex:
 *                       type: number
 *                       example: 0
 *                     script:
 *                       type: string
 *                       example: 76a9145f011c547af486dbaa36e1e500e2602fe819183f88ac
 *                     satoshis:
 *                       type: number
 *                       example: 500000000000
 *                     height:
 *                       type: number
 *                       example: 1121275
 */
export async function GET(
  _request: Request,
  {
    params: { address, blockchain },
  }: { params: { address: string; blockchain: string } }
) {
  // let parsed =
  // Object.keys(params).length === 1 && params.addresses.length
  //   ? Object.values(params).flat()
  //   : params;
  try {
    const data = await rpcClients[blockchain].request("getaddressutxos", [
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
