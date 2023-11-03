
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { GetMiningInfoResponse } from "@/types/api/v1/mining";

/**
 * @swagger
 * /api/v1/{blockchain}/mining/info:
 *    get:
 *      tags:
 *        - Mining
 *      description: Returns an object containing mining-related information.
 *      parameters:
 *        - name: blockchain
 *          in: path
 *          description: Valid blockchain symbol
 *          schema:
 *            type: string
 *            example: btc
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  blocks:
 *                    type: number
 *                    example: 1144222
 *                  currentblockweight:
 *                    type: number
 *                    example: 4000
 *                  currentblocktx:
 *                    type: number
 *                    example: 0
 *                  difficulty:
 *                    type: number
 *                    example: 0.2399196057901404
 *                  networkhashps:
 *                    type: number
 *                    example: 21493005.92375639
 *                  hashespersec:
 *                    type: number
 *                    example: 0
 *                  pooledtx:
 *                    type: number
 *                    example: 0
 *                  chain:
 *                    type: string
 *                    example: test
 *                  warnings:
 *                    type: string
 *                    example: "Warning: unknown new rules activated (versionbit 11)"
 */
export async function GET(
  _req: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
): Promise<Response<GetMiningInfoResponse | ResponseError>> {
  try {
    const data = await rpcClients[blockchain].request("getmininginfo");
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
