import { ApiBlock } from "@/app/(server)/api/v1/explorer/blocks";
import { getBlockQuery } from ".";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const getBlocks = async (blockhash: string, blockchain: string) => {
  const blocks = [];
  try {
    let hash = blockhash;
    for (let i = 0; i < 10; i++) {
      const block = await getBlockQuery({
        queryKey: [
          "",
          {
            blockhash: hash,
            blockchain,
          },
        ],
      });
      if (!(block as unknown as Error)?.message) {
        hash = (block as ApiBlock).previousblockhash;
        blocks.push(block);
      }
    }
    return blocks;
  } catch (e) {
    return blocks;
  }
};

type GetBlocksQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  blockhash: string;
  blockchain: string;
};

export function useGetBlocksQuery({
  blockhash,
  blockchain,
  ...options
}: GetBlocksQueryProps) {
  return useQuery<string, Error>({
    queryKey: ["blocks", "list", blockhash, blockchain],
    // @ts-ignore
    queryFn: getBlockQuery,
    ...options,
    staleTime: 5 * 60 * 1000,
  });
}
