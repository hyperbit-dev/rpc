export async function fetchNexus<T>(url: string, params?: any): Promise<T> {
  const host = `${process.env.NEXT_NEXUS_URL}${url}`;
  let sessionAuth: any | string | null = sessionStorage.getItem("auth");
  sessionAuth = sessionAuth ? (JSON.parse(sessionAuth) as any) : null;

  const response = await fetch(host, {
    ...params,
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionAuth ? `Bearer ${sessionAuth.token}` : undefined,
    },
  });

  const res = await response.json();

  if (response?.ok) {
    return res as Promise<T>;
  }

  const error = Array.isArray(res) ? res?.[0]?.message : res?.message || res;

  throw new Error(error) as unknown as Promise<T>;
}

export async function fetchClient<T>(url: string, params?: any): Promise<T> {
  const host = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const baseUrl = `${host}${url}`;
  let sessionAuth: any | string | null = sessionStorage.getItem("auth");
  sessionAuth = sessionAuth ? (JSON.parse(sessionAuth) as any) : null;

  const response = await fetch(baseUrl, {
    ...params,
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionAuth ? `Bearer ${sessionAuth.token}` : undefined,
    },
  });

  const res = await response.json();

  if (response?.ok) {
    return res as Promise<T>;
  }

  const error = Array.isArray(res) ? res?.[0]?.message : res?.message || res;

  throw new Error(error) as unknown as Promise<T>;
}
