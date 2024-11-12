import React from "react";
import { DescriptionList } from "@/_components/DescriptionList";
import { Description } from "@/_components/Description";
import { useGetAssetQuery } from "@/_api/client/assets/get-asset";
import Skeleton from "react-loading-skeleton";

type TabOverviewProps = {
  name: string;
  blockchain: string;
};

export function TabOverview({ name, blockchain }: TabOverviewProps) {
  const assetQuery = useGetAssetQuery({ asset: name, blockchain });
  const asset = assetQuery.data;

  if (assetQuery.isLoading) {
    return <Skeleton count={5} />;
  }

  if (assetQuery.isError) {
    return <div className="p-1">Asset not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-3/5">
        <DescriptionList>
          <Description
            name="Name"
            value={asset?.name ?? "-"}
            copyValue={asset?.name}
          />
          <Description name="Total Supply" value={asset?.amount ?? "-"} />
          <Description name="Units" value={asset?.units ?? "-"} />
          <Description
            name="Reissuable"
            value={asset?.reissuable ? "Yes" : "No"}
          />
          <Description
            name="IPFS"
            copyValue={asset.ipfs_hash}
            value={
              asset.ipfs_hash ? (
                <a
                  href={`https://ipfs.chaintek.net/ipfs/${asset.ipfs_hash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center group text-cerulean-500 hover:text-cerulean-700 md:justify-end"
                >
                  {asset.ipfs_hash}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 32 32"
                    className="ml-2 fill-cerulean-500 group-hover:fill-cerulean-700"
                  >
                    <path d="M 18 5 L 18 7 L 23.5625 7 L 11.28125 19.28125 L 12.71875 20.71875 L 25 8.4375 L 25 14 L 27 14 L 27 5 Z M 5 9 L 5 27 L 23 27 L 23 14 L 21 16 L 21 25 L 7 25 L 7 11 L 16 11 L 18 9 Z" />
                  </svg>
                </a>
              ) : (
                "No"
              )
            }
          />
        </DescriptionList>
      </div>
      <pre className="bg-gray-100 p-4 rounded-md w-full md:w-2/5 border border-gray-200 text-wrap">
        {JSON.stringify(asset, null, 2)}
      </pre>
    </div>
  );
}
