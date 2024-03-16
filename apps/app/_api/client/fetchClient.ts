export const checkEnvironment = () => {
  let base_url =
    process.env.NEXT_PUBLIC_URL ??
    "http://localhost:3000" ??
    (typeof window !== "undefined" && window.location.origin);
  return base_url;
};

export function fetchClient<T>(url: string, params?: any): Promise<T> {
  const host = `${checkEnvironment()}${url}`;
  
  return fetch(host, {
    ...params,
    // mode: "cors",
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    // headers: {
    //   Cookie: cookies()
    //     .getAll()
    //     .map(({ name, value }) => `${name}=${value}`)
    //     .join("; "),
    // },
  }).then((response) => response.json() as Promise<T>);
}
