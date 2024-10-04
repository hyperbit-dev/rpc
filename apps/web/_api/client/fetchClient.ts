import { AuthResponse } from "./auth/types";

export const checkEnvironment = (nexus: boolean = false) => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? nexus
        ? "http://localhost:3333"
        : (process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000")
      : (process.env.HOST ??
        (typeof window !== "undefined" && window.location.origin));
  return base_url;
};

export async function fetchNexus<T>(url: string, params?: any): Promise<T> {
  const host = `${checkEnvironment(true)}${url}`;
  let sessionAuth: AuthResponse | string | null =
    sessionStorage.getItem("auth");
  sessionAuth = sessionAuth ? (JSON.parse(sessionAuth) as AuthResponse) : null;

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
  const host = `${checkEnvironment()}${url}`;
  let sessionAuth: AuthResponse | string | null =
    sessionStorage.getItem("auth");
  sessionAuth = sessionAuth ? (JSON.parse(sessionAuth) as AuthResponse) : null;

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
