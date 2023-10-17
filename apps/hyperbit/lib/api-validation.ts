import { NextResponse } from "next/server";

export function handleResponse(data: any) {
  if (data.status === 500) {
    throw new Error(data?.message);
  }
  return NextResponse.json(data, { status: 200 });
}

export function handleError(err: Error) {
  const message = (err as any)?.errors?.[0]?.message ?? err?.message;
  return NextResponse.json({ message }, { status: 400 });
}
