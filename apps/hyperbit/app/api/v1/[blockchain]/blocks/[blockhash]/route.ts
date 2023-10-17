import { rpcClients } from "@/lib/rpc";
import * as z from "zod";
import { handleError, handleResponse } from "@/lib/api-validation";

const schema = z.object({
  verbosity: z.number().gte(0).lte(2).optional(),
});

/**
 * @swagger
 * /api/v1/{blockchain}/blocks/{blockhash}:
 *    get:
 *      tags:
 *        - Blocks
 *      description: Returns an object with information about block and information about each transaction
 *      parameters:
 *        - name: blockchain
 *          in: path
 *          description: Valid blockchain symbol
 *          schema:
 *            type: string
 *            example: btc
 *        - name: blockhash
 *          in: path
 *          description: Valid blockhash
 *          schema:
 *            type: string
 *            example: 0000001f6a7c80d0500e5612b639cd4bdfa05cfed2cb131d79c26fdbbd42bea5
 *          required: true
 *        - name: verbosity
 *          in: query
 *          schema:
 *            type: number
 *            example: 0
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
export async function GET(
  request: Request,
  {
    params: { blockhash, blockchain },
  }: { params: { blockhash: string; blockchain: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const verbosity = Number(searchParams.get("verbosity"));
    schema.parse({ verbosity });
    const data = await rpcClients[blockchain].request("getblock", {
      blockhash,
      verbosity: verbosity ? Number(verbosity) : 0,
    });
    return handleResponse(data);
  } catch (err) {
    return handleError(err as Error);
  }
}
