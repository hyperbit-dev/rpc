import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function isAuthenticated(req: NextRequest) {
  const token = await getToken({
    req,
    secret,
  });
  return token;
}
