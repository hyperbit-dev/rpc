import { getToken } from "next-auth/jwt";
import { NextApiRequest } from "next";

const secret = process.env.NEXTAUTH_SECRET;

export async function isAuthenticated(req: NextApiRequest) {
  const token = await getToken({
    req,
    secret,
  });
  return token;
}
