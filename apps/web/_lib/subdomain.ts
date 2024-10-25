"use client";

export const getValidSubdomain = (host?: string | null | Request) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== "undefined") {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (typeof host === "object" && host !== null) {
    host = host.headers.get("host");
    if (typeof host === "string") {
      host.split(".")[0];
    }
  }
  if (typeof host === "string" && host.includes(".")) {
    if (host.startsWith("127")) {
      return null;
    }
    const candidate = host.split(".")[0];
    if (candidate && !candidate.includes("localhost")) {
      // Valid candidate
      subdomain = candidate;
    }
  }

  return subdomain;
};
