
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { GetRawMempoolResponse } from "@/types/api/v1/mempool";

/**
 * @swagger
 * /api/v1/{blockchain}/mempool/raw:
 *    get:
 *      tags:
 *        - Mempool
 *      description: Returns all transaction ids in memory pool as a json array of string transaction ids.
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
 *                type: array
 */
export async function GET(
  _req: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
): Promise<Response<GetRawMempoolResponse[] | ResponseError>> {
  try {
    const data = await rpcClients[blockchain].request("getrawmempool", {});
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
