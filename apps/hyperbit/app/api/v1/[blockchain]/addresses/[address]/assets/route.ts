import { config } from "@/lib/config";
import { rpcClients } from "@/lib/rpc";
import { AssetDataResponse, ResponseError } from "@/types/api";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/{blockchain}/addresses/{address}/assets:
 *    get:
 *      tags:
 *        - Addresses
 *      description: If assets are enabled on the blockchain, returns a list of all asset balances for an address.
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
 *                type: object
 *                properties:
 *                  HYPERBIT:
 *                    type: number
 *                    example: 21000000000
 *                  HYPERBIT!:
 *                    type: number
 *                    example: 1
 */
export async function GET(
  req: Request,
  {
    params: { address, blockchain },
  }: {
    params: {
      address: string;
      blockchain: string;
    };
  }
): Promise<NextResponse<AssetDataResponse | ResponseError>> {
  const chain = config.chains[blockchain];
  if (!chain.features.assetsEnabled) {
    return NextResponse.json({ message: "Not Implemented" }, { status: 501 });
  }
  // const body = [address, onlytotal ?? false, count ?? 50000, start ?? 0];
  const body = [address, false, 50000, 0];
  try {
    const data = await rpcClients[blockchain].request(
      "listassetbalancesbyaddress",
      body
    );
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return NextResponse.json({ message }, { status: 400 });
  }
}
