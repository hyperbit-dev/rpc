import { NextResponse } from "next/server";
import * as z from "zod";
import { rpcClients } from "@/lib/rpc";
import { Asset, ResponseError } from "@/types/api";
import { config } from "@/lib/config";

const INT_MAX = 2147483647;

const schema = z.object({
  verbose: z.boolean().or(z.string()).optional(),
  count: z.number().min(0).optional(),
  start: z.number().min(0).optional(),
});

/**
 * @swagger
 * /api/v1/{blockchain}/assets:
 *    get:
 *      tags:
 *        - Assets
 *      description: If assets are enabled on the blockchain, returns a list of all assets. This could be a slow/expensive operation as it reads from the database.
 *      parameters:
 *        - name: blockchain
 *          in: path
 *          description: Valid blockchain symbol
 *          schema:
 *            type: string
 *            example: btc
 *        - name: verbose
 *          in: query
 *          description: When false result is just a list of asset names -- when true results are asset name mapped to metadata.
 *          schema:
 *            type: boolean
 *            example: true
 *        - name: count
 *          in: query
 *          description: Truncates results to include only the first count assets found.
 *          schema:
 *            type: string
 *            example: 25
 *        - name: start
 *          in: query
 *          description: Results skip over the first start assets found (if negative it skips back from the end).
 *          schema:
 *            type: string
 *            example: 0
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  123:
 *                    type: object
 *                    properties:
 *                      name:
 *                          type: string;
 *                          example: 123
 *                      amount:
 *                          type: number;
 *                          example: 1
 *                      units:
 *                          type: number;
 *                          example: 0
 *                      reissuable:
 *                          type: number;
 *                          example: 1
 *                      has_ipfs:
 *                          type: number;
 *                          example: 0
 *                      block_height:
 *                          type: number;
 *                          example: 193676
 *                      blockhash:
 *                          type: string;
 *                          example: 000000861652daac50e4236c130a1b8459b43f6911002295b42466abfba85905
 */
export async function GET(
  request: Request,
  { params: { blockchain } }: { params: { blockchain: string } }
): Promise<NextResponse<Record<string, Asset> | ResponseError>> {
  const chain = config.chains[blockchain];
  if (!chain.features.assetsEnabled) {
    return NextResponse.json({ message: "Not Implemented" }, { status: 501 });
  }

  const { searchParams } = new URL(request.url);
  const verbose = searchParams.get("verbose");
  const count = Number(searchParams.get("count")) ?? 25;
  const start = Number(searchParams.get("start"));

  const parsed = schema.parse({
    verbose: verbose === "true" ? true : false,
    count,
    start,
  });
  const body = [
    "*",
    parsed.verbose ?? false,
    parsed.count ?? INT_MAX,
    parsed.start ?? 0,
  ];
  try {
    const data = await rpcClients[blockchain].request("listassets", body);
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
