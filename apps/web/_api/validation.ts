export function handleResponse<T>(data: T): Response {
  if ((data as any).status === 500) {
    throw new Error((data as any)?.message);
  }
  return Response.json(data, { status: 200 });
}

export function handleError(err: Error) {
  const message = (err as any)?.errors?.[0]?.message ?? err?.message;
  return Response.json({ message }, { status: 500 });
}
