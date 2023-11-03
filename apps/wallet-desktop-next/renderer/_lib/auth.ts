import crypto from "node:crypto";
import { GetServerSidePropsContext, NextApiRequest } from "next";

// Handle API and SSR requests
type SessionRequest = NextApiRequest | GetServerSidePropsContext["req"];

function clean(str: string) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function generateChallenge() {
  return clean(crypto.randomBytes(32).toString("base64"));
}

export function isLoggedIn(request: SessionRequest) {
  return !!request.session.userId;
}
