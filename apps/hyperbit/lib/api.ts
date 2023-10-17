import { cookies } from "next/headers";

export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:3000"
      : process.env.HOST;
  return base_url;
};

// @ts-ignore
export function api<T>(url: string, ...params): Promise<T> {
  const host = `${checkEnvironment()}${url}`;
  return fetch(host, {
    ...params,
    mode: "cors",
    credentials: "include",
    headers: {
      Cookie: cookies()
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; "),
    },
  }).then((response) => response.json() as Promise<T>);
}
