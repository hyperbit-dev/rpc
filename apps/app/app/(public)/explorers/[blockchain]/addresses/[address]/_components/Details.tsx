import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { DescriptionList } from "@/_components/DescriptionList";
import { Description } from "@/_components/Description";
import { MarketLatest } from "@/_api/client/market/types";

export function Details({
  address,
  addressBalance,
  marketLatest,
}: {
  address: string;
  addressBalance?: any;
  marketLatest?: MarketLatest;
}) {
  return (
    <>
      <DescriptionList>
        <Description name="Address" value={address} />
        <Description
          name="Balance"
          value={
            <Suspense fallback={<Skeleton count={1} />}>
              <div>
                {addressBalance?.balance
                  ? Number(addressBalance.balance) / 1e8
                  : 0}
              </div>
              <div className="text-sm text-gray-600">
                $
                {marketLatest?.price && addressBalance?.balance
                  ? (
                      Number(addressBalance.balance) *
                      0.00000001 *
                      marketLatest.price
                    ).toFixed(2)
                  : "-"}
              </div>
            </Suspense>
          }
          copyValue={addressBalance?.balance}
        />
        <Description
          name="Received"
          value={
            <Suspense fallback={<Skeleton count={1} />}>
              <div>
                {addressBalance?.received
                  ? Number(addressBalance.received) / 1e8
                  : 0}
              </div>
              <div className="text-sm text-gray-600">
                $
                {marketLatest?.price
                  ? (
                      Number(addressBalance?.received) *
                      0.00000001 *
                      marketLatest.price
                    ).toFixed(2)
                  : "-"}
              </div>
            </Suspense>
          }
          copyValue={addressBalance?.received}
        />
      </DescriptionList>
    </>
  );
}
