import { Buffer } from "node:buffer";
import denodeify from "denodeify";
import { reverseBuffer } from "@hyperbit-private/utils";

// eslint-disable-next-line
const merklebitcoin = denodeify(require("merkle-bitcoin"));

async function _calcRoot(hashes: string[]): Promise<string> {
  const result: Record<string, any> = await merklebitcoin(hashes);
  return result.root;
}

type Transaction = {
  txid: string;
  hash: string;
};

type RpcData = {
  transactions: Transaction[];
};

export async function getRoot(
  rpcData: RpcData,
  generateTxRaw: string,
): Promise<string> {
  const hashes = [
    reverseBuffer(Buffer.from(generateTxRaw, "hex")).toString("hex"),
  ];
  rpcData.transactions.forEach((value) => {
    if (value.txid !== undefined) {
      hashes.push(value.txid);
    } else {
      hashes.push(value.hash);
    }
  });

  if (hashes.length === 1) {
    return hashes[0]!;
  }

  const result = await _calcRoot(hashes);
  return result;
}
