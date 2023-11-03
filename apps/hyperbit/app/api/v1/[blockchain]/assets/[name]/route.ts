
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { config } from "@/lib/config";

/**
 * @swagger
 * /api/v1/{blockchain}/assets/{name}:
 *    get:
 *      tags:
 *        - Assets
 *      description: If assets are enabled on the blockchain, returns assets metadata if that asset exists.
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
 *                  name:
 *                    type: string
 *                    example: HYPERBIT
 *                  amount:
 *                    type: number
 *                    example: 21000000000
 *                  units:
 *                    type: number
 *                    example: 0
 *                  reissuable:
 *                    type: number
 *                    example: 1
 *                  has_ipfs:
 *                    type: number
 *                    example: 0
 */
export async function GET(
  _request: Request,
  {
    params: { name, blockchain },
  }: { params: { name: string; blockchain: string } }
): Promise<any> {
  const assetName = name.split("-").join("/");
  const chain = config.chains[blockchain];
  if (!chain.features.assetsEnabled) {
    return Response.json({ message: "Not Implemented" }, { status: 501 });
  }

  try {
    const data = await rpcClients[blockchain].request("getassetdata", {
      asset_name: assetName.toUpperCase(),
    });
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
