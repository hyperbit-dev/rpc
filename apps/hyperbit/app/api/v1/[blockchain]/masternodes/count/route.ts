
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { config } from "@/lib/config";

/**
 * @swagger
 * /api/v1/{blockchain}/masternodes/count:
 *    get:
 *      deprecated: true
 *      tags:
 *        - Masternodes
 *      description: If enabled on the blockchain, get information about number of masternodes.
 *      parameters:
 *        - name: blockchain
 *          in: path
 *          description: Valid blockchain symbol
 *          schema:
 *            type: string
 *            example: pgn
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  total:
 *                    type: number
 *                    example: 332
 *                  enabled:
 *                    type: number
 *                    example: 296
 */
export async function GET(
  _req: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
): Promise<any> {
  const chain = config.chains[blockchain];
  if (!chain.features.masternodesEnabled) {
    return Response.json({ message: "Not Implemented" }, { status: 501 });
  }

  try {
    const data = await rpcClients[blockchain].request("masternode", ['count']);
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
