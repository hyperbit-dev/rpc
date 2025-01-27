import { Chart } from "~/components/chart";
import { NexusWallet } from "~/utils/queries/wallets/types";

type MarketChartProps = {
  wallet: NexusWallet;
};

export function MarketChart({ wallet }: MarketChartProps) {
  if (!wallet.marketChart?.prices?.length) return null;

  return (
    <div className="border border-secondary-500 bg-secondary-600 rounded-lg px-4 pt-4 pb-1">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="text-xl text-gray-100">Price</h2>
          <div className="text-gray-400">${wallet.marketData?.price}</div>
        </div>
        <div className="text-right">
          {wallet.marketChart ? (
            <div>
              {new Date(wallet.marketChart.prices[0][0]).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC",
                }
              )}
              {" - "}
              {new Date(
                wallet.marketChart.prices[
                  wallet.marketChart.prices.length - 1
                ][0]
              ).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              })}
            </div>
          ) : undefined}
        </div>
      </div>
      <Chart
        prices={wallet.marketChart?.prices ?? []}
        avgPrice={wallet.marketData?.price ?? 0}
      />
    </div>
  );
}
