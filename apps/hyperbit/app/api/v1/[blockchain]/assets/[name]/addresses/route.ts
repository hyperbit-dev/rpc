
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { config } from "@/lib/config";

/**
 * @swagger
 * /api/v1/{blockchain}/assets/{name}/addresses:
 *    get:
 *      tags:
 *        - Assets
 *      description: If assets are enabled on the blockchain, returns a list of all address that own the given asset (with balances) or returns the total size of how many address own the given asset.
 *      parameters:
 *        - name: blockchain
 *          in: path
 *          description: Valid blockchain symbol
 *          schema:
 *            type: string
 *            example: btc
 *        - name: name
 *          in: path
 *          description: Valid asset name
 *          schema:
 *            type: string
 *            example: HYPERBIT
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  n1Mtr9gfUe9eMxXiSbR4Hm3wVNkcZiqKhE:
 *                    type: number
 *                    example: 21000000000
 */
export async function GET(
  _request: Request,
  {
    params: { name, blockchain },
  }: { params: { name: string; blockchain: string } }
): Promise<any> {
  const chain = config.chains[blockchain];
  if (!chain.features.assetsEnabled) {
    return Response.json({ message: "Not Implemented" }, { status: 501 });
  }

  // const body = [asset_name, onlytotal ?? false, count ?? 50000, start ?? 0];
  const body = [name.toUpperCase(), false, 50000, 0];
  try {
    const data = await rpcClients[blockchain].request(
      "listaddressesbyasset",
      body
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
