// middleware.ts
import { NextApiResponse } from "next";
import type { NextApiRequest } from "next";
import { getValidSubdomain } from "./lib/subdomain";
import { isAuthenticated } from "./lib/api/auth";
import { cookies } from "next/headers";

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Better matching pattern for expanded use
  if (req?.url?.startsWith("/api/v1/wallets")) {
    if (!(await isAuthenticated(req))) {
      return res
        .status(401)
        .json({ success: false, message: "authentication failed" });
    }
  }

  if (req.url) {
    // Clone the URL
    let url = req.url;

    // Skip public files
    if (url && (PUBLIC_FILE.test(url) || url.includes("_next"))) return;

    const subdomain = getValidSubdomain(req.url);
    if (subdomain) {
      if (url.includes("/explorer")) {
        url.replace("/explorer", `/explorers/${subdomain}`);
        return res.write(url);
        // return res.direct(new URL("/", url));
      } else if (url.includes("/faucet")) {
        const pathname = url.replace("/faucet", `/faucets/${subdomain}`);
        url = pathname;
        return res.write(url);
        // return NextApiResponse.redirect(new URL("/", url));
      }
      if (!req.url.includes("/api/v1") && !req.url.includes("/api/auth")) {
        // Subdomain available, rewriting
        // console.log(
        //   `>>> Rewriting: ${url} to /${subdomain}${url}`
        // );
        url = `/${subdomain}${url}`;

        return res.write(url);
      }
    }
  }
}
