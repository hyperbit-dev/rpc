
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { config } from "@/lib/config";

/**
 * @swagger
 * /api/v1/{blockchain}/masternodes/current:
 *    get:
 *      tags:
 *        - Masternodes
 *      description: If enabled on the blockchain, print info on current masternode winner to be paid the next block (calculated locally).
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
 *                  height:
 *                    type: number
 *                    example: 2746718
 *                  IP:port:
 *                    type: string
 *                    example: 164.68.112.235:8757
 *                  proTxHash:
 *                    type: string
 *                    example: 1142029bc54391d35d5eb1202d87f6f2c1f08fe49d4927026267f66c1d1e5142
 *                  outpoint:
 *                    type: string
 *                    example: 55d1947e921d9e3644d587325a0dc82da947feac515d44e32b8c2bf222dcc48e-1
 *                  payee:
 *                    type: string
 *                    example: PKwEddLwM45risariiXGkJ41wcCvkPUgV5
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
    const data = await rpcClients[blockchain].request("masternode", ['current']);
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
