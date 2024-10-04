import { NextResponse } from "next/server";
import fetch from "node-fetch";

const proxyUrl = process.env.PROXY_URL;

export async function GET(req: Request) {
  const pathname = new URL(req.url).pathname;
  const url = `${proxyUrl}/${pathname}`;
  console.log('url', url)

  const options = {
    method: req.method,
    headers: Object.fromEntries(req.headers),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}

export async function POST(req: Request) {
  return proxy(req);
}
export async function PUT(req: Request) {
  return proxy(req);
}
export async function PATCH(req: Request) {
  return proxy(req);
}
export async function DELETE(req: Request) {
  return proxy(req);
}

async function proxy(req: Request) {
  const pathname = new URL(req.url).pathname;
  const url = `http://localhost:3333${pathname}`;

  const body = await req.json();

  const options = {
    method: req.method,
    headers: Object.fromEntries(req.headers),
    body: JSON.stringify(body),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
