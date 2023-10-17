import { cache } from "react";
import { api } from "../api";

export const getBlocks = async (blockhash: string, blockchain: string) => {
  const blocks = [];
  try {
    let hash = blockhash;
    for (let i = 0; i < 10; i++) {
      const block = await getBlock(hash, blockchain);
      if (block) {
        hash = block.previousblockhash;
        blocks.push(block);
      }
    }
    return blocks;
  } catch (e) {
    return blocks;
  }
};

export const getBlock = async (blockhash: string, blockchain: string) => {
  const url = `/api/v1/${blockchain}/blocks/${blockhash}?${new URLSearchParams({
    verbosity: 2,
  })}`;
  const block = await api(url);
  if (block?.message === "Block not found") {
    return block;
  }
  block.kb = block.size / Math.pow(1024, 1);
  block.output = block.tx.reduce((a, c) => {
    const vout = c.vout.reduce((ac, cu) => (ac += cu.value), 0);
    return (a += vout);
  }, 0);
  return block;
};

export const getBlockHeight = cache(
  (height: string | number, blockchain: string) => {
    return api<Promise<string>>(
      `/api/v1/${blockchain}/blocks/height/${height}`,
      {
        cache: "no-store",
      }
    );
  }
);
