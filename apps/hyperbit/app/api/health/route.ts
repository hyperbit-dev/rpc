import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/health:
 *    get:
 *      tags:
 *        - Misc
 *      description: Check health of api
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: healthy
 */
export async function GET(_request: Request) {
  return NextResponse.json({ message: "healthy" }, { status: 200 });
}
