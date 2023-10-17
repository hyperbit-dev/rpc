import React from "react";
import { SectionAddresses } from "./SectionAddresses";
import { SectionCard } from "@/components/SectionCard";
import { GetAssetDataResponse } from "@/types/api";

export function Details({
  blockchain,
  asset,
  addresses,
}: {
  blockchain: string;
  asset: GetAssetDataResponse;
  addresses: any;
}) {
  return (
    <>
      <SectionCard>
        <dl className="grid md:grid-cols-[25%_auto] divide-y">
          <dt className="p-2">Name</dt>
          <dd className="p-2 border-b border-t-transparent md:text-right md:border-b-transparent">
            {asset?.name ?? "-"}
          </dd>
          <dt className="p-2">Amount</dt>
          <dd className="p-2 border-b md:text-right md:border-b-transparent">
            {asset?.amount ?? "-"}
          </dd>
          <dt className="p-2">Units</dt>
          <dd className="p-2 border-b md:text-right md:border-b-transparent">
            {asset?.units ?? "-"}
          </dd>
          <dt className="p-2">Reissuable</dt>
          <dd className="p-2 border-b md:text-right md:border-b-transparent">
            {asset?.reissuable ? "Yes" : "No"}
          </dd>
          <dt className="p-2">IPFS</dt>
          <dd className="p-2 border-b md:text-right md:border-b-transparent">
            {asset.has_ipfs ? (
              <a
                href={`https://ipfs.io/ipfs/${asset.ipfs_hash}`}
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
            )}
          </dd>
        </dl>
      </SectionCard>
      {!!Object.keys(addresses).length && (
        <SectionAddresses addresses={addresses} blockchain={blockchain} />
      )}
    </>
  );
}
