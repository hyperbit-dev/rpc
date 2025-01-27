import * as Tabs from "@radix-ui/react-tabs";
import { useParams } from "@tanstack/react-router";
import clsx from "clsx";
import { useGetWalletQuery } from "~/utils/queries";
import { OverviewTab } from "./components/tab-overview";
import { Container } from "~/components/container";

export function WalletScreen() {
  const { walletId } = useParams({ strict: false });
  const getWalletQuery = useGetWalletQuery({
    walletId,
  });
  const wallet = getWalletQuery.data;

  if (!wallet) return null;

  return (
    <Container>
      <div className="flex flex-row items-center gap-3 mt-6 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-500"></div>
        <div className="flex flex-col">
          <h1 className="text-2xl">{wallet.label}</h1>
          <span>
            {wallet.blockchain.name}{" "}
            <span className="uppercase">({wallet.blockchain.symbol})</span>
          </span>
        </div>
      </div>
      <Tabs.Root defaultValue="overview">
        <div className="mb-4 border-b border-secondary-300">
          <Tabs.List className="flex flex-wrap -mb-px font-normal text-sm text-center">
            <Tabs.Trigger
              className={clsx(
                "data-[state=active]:text-brand-500 data-[state=active]:hover:text-brand-500 data-[state=active]:border-brand-500 ",
                "inline-block p-3 border-b-2 border-transparent -mt-[1px] rounded-t-lg hover:text-brand-500 hover:border-brand-500"
              )}
              value="overview"
            >
              Overview
            </Tabs.Trigger>
            <Tabs.Trigger
              className={clsx(
                "data-[state=active]:text-brand-500 data-[state=active]:hover:text-brand-500 data-[state=active]:border-brand-500 ",
                "inline-block p-3 border-b-2 border-transparent -mt-[1px] rounded-t-lg hover:text-brand-500 hover:border-brand-500"
              )}
              value="tab2"
            >
              Transactions
            </Tabs.Trigger>
            <Tabs.Trigger
              className={clsx(
                "data-[state=active]:text-brand-500 data-[state=active]:hover:text-brand-500 data-[state=active]:border-brand-500 ",
                "inline-block p-3 border-b-2 border-transparent -mt-[1px] rounded-t-lg hover:text-brand-500 hover:border-brand-500"
              )}
              value="tab3"
            >
              Addresses
            </Tabs.Trigger>
            <Tabs.Trigger
              className={clsx(
                "data-[state=active]:text-brand-500 data-[state=active]:hover:text-brand-500 data-[state=active]:border-brand-500 ",
                "inline-block p-3 border-b-2 border-transparent -mt-[1px] rounded-t-lg hover:text-brand-500 hover:border-brand-500"
              )}
              value="tokens"
            >
              Tokens
            </Tabs.Trigger>
            <Tabs.Trigger
              className={clsx(
                "data-[state=active]:text-brand-500 data-[state=active]:hover:text-brand-500 data-[state=active]:border-brand-500 ",
                "inline-block p-3 border-b-2 border-transparent -mt-[1px] rounded-t-lg hover:text-brand-500 hover:border-brand-500"
              )}
              value="tab4"
            >
              Settings
            </Tabs.Trigger>
          </Tabs.List>
        </div>
        <Tabs.Content value="overview">
          <OverviewTab wallet={wallet} />
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <p className="mb-5 text-[15px] leading-normal text-mauve11">
            Change your password here. After saving, you'll be logged out.
          </p>
          <fieldset className="mb-[15px] flex w-full flex-col justify-start">
            <label
              className="mb-2.5 block text-[13px] leading-none text-violet12"
              htmlFor="currentPassword"
            >
              Current password
            </label>
            <input
              className="h-[35px] shrink-0 grow rounded-md px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              id="currentPassword"
              type="password"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex w-full flex-col justify-start">
            <label
              className="mb-2.5 block text-[13px] leading-none text-violet12"
              htmlFor="newPassword"
            >
              New password
            </label>
            <input
              className="h-[35px] shrink-0 grow rounded-md px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              id="newPassword"
              type="password"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex w-full flex-col justify-start">
            <label
              className="mb-2.5 block text-[13px] leading-none text-violet12"
              htmlFor="confirmPassword"
            >
              Confirm password
            </label>
            <input
              className="h-[35px] shrink-0 grow rounded-md px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              id="confirmPassword"
              type="password"
            />
          </fieldset>
          <div className="mt-5 flex justify-end">
            <button className="inline-flex h-[35px] cursor-default items-center justify-center rounded-md bg-green4 px-[15px] text-[15px] font-medium leading-none text-green11 outline-none hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7">
              Change password
            </button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
