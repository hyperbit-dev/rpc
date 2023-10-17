import { Suspense } from "react";
import { AddressBalanceResponse, MarketLatest } from "@/types/api";
import Skeleton from "react-loading-skeleton";
import { SectionCard } from "@/components";

export function Details({
  address,
  addressBalance,
  marketLatest,
}: {
  address: string;
  addressBalance?: AddressBalanceResponse;
  marketLatest: MarketLatest;
}) {
  return (
    <>
      <SectionCard>
        <dl className="grid sm:grid-cols-[25%_auto] sm:divide-y overflow-x-auto">
          <dt className="p-2">Address</dt>
          <dd className="p-2 border-b border-t-transparent sm:text-right sm:border-b-transparent">
            {address}
          </dd>
          <dt className="p-2">Balance</dt>
          <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
            <Suspense fallback={<Skeleton count={1} />}>
              <div>
                {addressBalance ? Number(addressBalance.balance) / 1e8 : 0}
              </div>
              <div className="text-sm text-gray-600">
                $
                {marketLatest.price
                  ? (
                      Number(addressBalance.balance) *
                      0.00000001 *
                      marketLatest.price
                    ).toFixed(2)
                  : "-"}
              </div>
            </Suspense>
          </dd>
          <dt className="p-2">Received</dt>
          <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
            <Suspense fallback={<Skeleton count={1} />}>
              <div>
                {addressBalance ? Number(addressBalance.received) / 1e8 : 0}
              </div>
              <div className="text-sm text-gray-600">
                $
                {marketLatest.price
                  ? (
                      Number(addressBalance.received) *
                      0.00000001 *
                      marketLatest.price
                    ).toFixed(2)
                  : "-"}
              </div>
            </Suspense>
          </dd>
        </dl>
      </SectionCard>
    </>
  );
}
