export async function fetchServer<T>(url: string, params?: any): Promise<T> {
  const host = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const baseUrl = `${host}${url}`;

  const response = await fetch(baseUrl, {
    ...params,
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();

  if (response?.ok) {
    return res as Promise<T>;
  }

  const error = Array.isArray(res) ? res?.[0]?.message : res?.message || res;

  throw new Error(error) as unknown as Promise<T>;
}
