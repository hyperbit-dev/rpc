// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getValidSubdomain } from "./lib/subdomain";
import { isAuthenticated } from "./lib/api/auth";
import { cookies } from "next/headers";

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  // TODO: Better matching pattern for expanded use
  if (req.nextUrl.pathname.startsWith("/api/v1/wallets")) {
    if (!(await isAuthenticated(req))) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "authentication failed" }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }
  }

  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;

  const subdomain = getValidSubdomain(req);
  if (subdomain) {
    if (url.pathname.includes('/explorer')) {
      url.pathname.replace('/explorer', `/explorers/${subdomain}`)
      return NextResponse.rewrite(url);
      // return NextResponse.redirect(new URL("/", url));
    } else if (url.pathname.includes('/faucet')) {
      const pathname = url.pathname.replace('/faucet', `/faucets/${subdomain}`)
      url.pathname = pathname;
      return NextResponse.rewrite(url);
      // return NextResponse.redirect(new URL("/", url));
    }
    if (!req.url.includes("/api/v1") && !req.url.includes("/api/auth")) {
      // Subdomain available, rewriting
      // console.log(
      //   `>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`
      // );
      url.pathname = `/${subdomain}${url.pathname}`;

      return NextResponse.rewrite(url);
    }
  }
}
