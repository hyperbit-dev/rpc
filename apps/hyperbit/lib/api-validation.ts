import { NextApiResponse } from "next";

export function handleResponse(data: any) {
  if (data.status === 500) {
    throw new Error(data?.message);
  }
  return NextApiResponse.json(data, { status: 200 });
}

export function handleError(err: Error) {
  const message = (err as any)?.errors?.[0]?.message ?? err?.message;
  return NextApiResponse.json({ message }, { status: 400 });
}
