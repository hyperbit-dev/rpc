import { AuthUser } from "~/hooks";
import { storage } from "~/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchClient(url: string, options: any) {
  const user = storage.get("user") as AuthUser;

  options = options ?? {};
  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
  };

  if (user) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${user.token}`,
    };
  }

  return fetch(url, options).then((x) => x.json());
}
