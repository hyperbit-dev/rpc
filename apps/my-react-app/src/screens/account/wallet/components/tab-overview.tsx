import {
  ArrowBottomRightIcon,
  ArrowDownIcon,
  ArrowTopRightIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Button } from "~/components/button";
import { convertBaseToDisplay } from "~/utils/chains";
import type { NexusWallet } from "~/utils/queries/wallets/types";
import { TransactionsCard } from "./transactions-card";
import { MarketChart } from "./market-chart-card";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { TransferSendDrawer } from "~/components/transfer-send-drawer";
import { TransferRecieveDrawer } from "~/components/transfer-receive-drawer";
import { AccountsCard } from "./accounts-card";

type OverviewTabProps = {
  wallet: NexusWallet;
};

export function OverviewTab({ wallet }: OverviewTabProps) {
  const displayAmount = convertBaseToDisplay(
    wallet?.totalBalance?.balance ?? 0,
    wallet.blockchain.externalChainId
  );

  const fiatAmount = wallet.marketData
    ? Number(displayAmount) * (wallet.marketData?.price ?? 0)
    : 0;
  const fiatAmount2 = wallet.marketChart?.prices?.length
    ? Number(displayAmount) *
      (wallet.marketChart?.prices[wallet.marketChart?.prices?.length - 2][1] ??
        0)
    : 0;

  const percentageDifference = ((fiatAmount - fiatAmount2) / fiatAmount2) * 100;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2">
          <div className="flex flex-col gap-4">
            <MarketChart wallet={wallet} />
            <AccountsCard wallet={wallet}/>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="border border-secondary-500 bg-secondary-600 p-4 rounded-lg">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl flex items-center gap-1 text-gray-100">
                  Total Balance{" "}
                  <sup>
                    <InfoCircledIcon />
                  </sup>
                </h2>
                <div className="flex items-center justify-start gap-2">
                  <div className="text-2xl">${fiatAmount.toFixed(2)}</div>
                  <div
                    className={clsx(
                      "flex items-center",
                      percentageDifference >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {new BigNumber(percentageDifference).toFixed(2)}%
                    {percentageDifference >= 0 ? (
                      <ArrowTopRightIcon />
                    ) : (
                      <ArrowBottomRightIcon />
                    )}
                  </div>
                </div>
                <div className="text-gray-400">
                  {displayAmount}{" "}
                  <span className="uppercase">{wallet.blockchain.symbol}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <TransferSendDrawer
                  Trigger={
                    <Button
                      type="button"
                      Width="full"
                      Variant="brand"
                      className="gap-1.5"
                    >
                      Transfer <ArrowTopRightIcon />
                    </Button>
                  }
                  wallet={wallet}
                />
                <TransferRecieveDrawer
                  Trigger={
                    <Button
                      type="button"
                      Width="full"
                      Variant="dark"
                      className="gap-1.5"
                    >
                      Request <ArrowDownIcon />
                    </Button>
                  }
                  wallet={wallet}
                />
              </div>
            </div>
          </div>

          <TransactionsCard wallet={wallet} />
        </div>
      </div>
    </>
  );
}
