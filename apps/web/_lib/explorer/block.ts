import { ApiBlock } from "@/app/api/v1/explorer/blocks";

export function getKb(block: ApiBlock): number {
  return block.size / Math.pow(1024, 1);
}

export function getOutput(block: ApiBlock) {
  return block.tx.reduce((a, c) => {
    const vout = c.vout.reduce((a, c) => (a += c.value), 0);
    return (a += vout);
  }, 0);
}
