import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "~/utils";

async function getWalletsQuery() {
  return fetchClient(`${import.meta.env.VITE_API_URL}/api/v1/wallets`, {
    method: "GET",
  });
}

export function useGetWalletsQuery() {
  return useQuery({
    queryKey: ["db-wallets"],

    queryFn: () => getWalletsQuery(),
  });
}
