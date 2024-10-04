import { fetchClient } from "./fetchClient";

export async function getMiningInfo(blockchain: string) {
  const data = await fetchClient<any>(
    `/api/v1/${blockchain}/mining/info`,
    {
      cache: "no-store",
    }
  );

  const difficulty =
    Math.trunc(Number(data.difficulty) * Math.pow(10, 4)) / Math.pow(10, 4);
  const hashrate =
    Math.trunc(Number(data.networkhashps * 0.000001) * Math.pow(10, 4)) /
    Math.pow(10, 4);

  return { ...data, difficulty, hashrate };
}
