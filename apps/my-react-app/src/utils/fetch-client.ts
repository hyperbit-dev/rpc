import { AuthResponse } from "~/utils/queries/auth";

export const checkEnvironment = () => {
  return import.meta.env.VITE_API_URL ?? "http://localhost:3333";
};

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
