
import { rpcClients } from "@/lib/rpc";
import { config } from "@/lib/config";

/**
 * @swagger
 * /api/v1/{blockchain}/addresses/{address}/restrictions:
 *    get:
 *      tags:
 *        - Addresses
 *      description: If assets are enabled on the blockchain, list all assets that have frozen this address.
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
 *               type: array
 *               items:
 *                 type: string
 *                 example: ASSET_NAME
 */
export async function GET(
  _request: Request,
  {
    params: { address, blockchain },
  }: { params: { address: string; blockchain: string } }
) {
  const chain = config.chains[blockchain];
  if (!chain.features.assetsEnabled) {
    return Response.json({ message: "Not Implemented" }, { status: 501 });
  }
  try {
    const data = await rpcClients[blockchain].request(
      "listaddressrestrictions",
      [address]
    );
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
