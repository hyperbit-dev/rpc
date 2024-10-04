const BASE_URL = "https://api.ravencoin.org/api";

export async function getMeowcoinAddress(addr: string) {
  const address = await fetch(`${BASE_URL}/addr/${addr}/?noTxList=1`).then(
    (x) => x.json()
  );
  return address;
}
