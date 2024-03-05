export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"
      : process.env.HOST ??
        (typeof window !== "undefined" && window.location.origin);
  return base_url;
};

// @ts-ignore
export function fetchClient<T>(url: string, ...params): Promise<T> {
  const host = `${checkEnvironment()}${url}`;
  return fetch(host, {
    ...params,
    // mode: "cors",
    cache: "no-store",
    credentials: "include",
    // headers: {
    //   Cookie: cookies()
    //     .getAll()
    //     .map(({ name, value }) => `${name}=${value}`)
    //     .join("; "),
    // },
  }).then((response) => response.json() as Promise<T>);
}
