
import { rpcClients } from "@/lib/rpc";
import { ResponseError } from "@/types/api";
import { config } from "@/lib/config";

/**
 * @swagger
 * /api/v1/{blockchain}/masternodes:
 *    get:
 *      tags:
 *        - Masternodes
 *      description: If enabled on the blockchain, get a list of masternodes in different modes. This call is identical to 'masternode list' call.
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
 *                  4fade61bd31aa661569eab448945a094ff747aa69b5227894e34d80bc736b550-0:
 *                    type: object
 *                    properties:
 *                      proTxHash:
 *                        type: string;
 *                        example: b503ef5c39b4956f9bb19016916a6f32fba118bcac37fee568a5796e0b6e0400
 *                      address:
 *                        type: string;
 *                        example: 76.72.254.8:8757
 *                      payee:
 *                        type: string;
 *                        example: PJa7UdP1HXVEmzriCARaNXAdmtG1ZJEt4S
 *                      status:
 *                        enum: [ENABLED, POSE_BANNED]
 *                        example: ENABLED
 *                      lastpaidtime:
 *                        type: number;
 *                        example: 1691751938
 *                      lastpaidblock:
 *                        type: number;
 *                        example: 2745741
 *                      owneraddress:
 *                        type: string;
 *                        example: PAhWC7FDoNkHtxKAnCB7MDXJLfJcKYwCEi
 *                      votingaddress:
 *                        type: string;
 *                        example: PQrGLa2ap3X4VRYTM3UVtXE9fCpnRimdDS
 *                      collateraladdress:
 *                        type: string;
 *                        example: PAPSeoRKyDTn8PidgX39Pw4hm3oFf5YE1e
 *                      pubkeyoperator:
 *                        type: string;
 *                        example: 10b28b94533ad650e3780d88ef45ddd81442179b4310416c3e1c566007c3789314392664b59753724937e0bc5aca2a89
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
    const data = await rpcClients[blockchain].request("masternodelist", {});
    if (data.status === 500) {
      throw new Error(data?.message);
    }
    return Response.json(data, { status: 200 });
  } catch (err) {
    const { message } = err as Error;
    return Response.json({ message }, { status: 400 });
  }
}
