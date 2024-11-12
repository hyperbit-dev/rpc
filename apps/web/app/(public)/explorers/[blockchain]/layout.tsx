import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { Container } from "~/_components/Container";
import { search } from "./actions";

import { config } from "~/_config";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const { blockchains: blockchainsConfig } = config;

export default async function Layout({
  params,
  ...props
}: {
  children: ReactNode;
  params: Promise<{ blockchain: string }>;
}) {
  const blockchain = (await params).blockchain;
  return <Content {...props} blockchain={blockchain} />;
}

function Content({
  children,
  blockchain,
}: {
  blockchain: string;
  children: ReactNode;
}) {
  const chain = blockchainsConfig.chains[blockchain];
  const placeholder = chain?.features?.assetsEnabled
    ? "Search blocks, transactions, and addresses..."
    : "Search blocks, transactions, addresses, and assets...";

  return (
    <>
      <div className="border-b border-gray-200 bg-brand-500 text-white">
        <Container className="md:flex items-center justify-between gap-16">
          <ul className="flex text-sm font-medium">
            <li>
              <Link
                href={`/explorers/${blockchain}`}
                className="block p-3 hover:text-brand-800 focus:text-brand-800 active:text-brand-800"
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                href={`/explorers/${blockchain}/blocks`}
                className="block p-3 hover:text-brand-800 focus:text-brand-800 active:text-brand-800"
              >
                Blocks
              </Link>
            </li>
            <li>
              <Link
                href={`/explorers/${blockchain}/assets`}
                className="block p-3 hover:text-brand-800 focus:text-brand-800 active:text-brand-800"
              >
                Assets
              </Link>
            </li>
          </ul>
          <form
            action={search}
            className="flex-1 grid md:grid-cols-[200px_auto_100px] my-3 text-white rounded-md max-w-3xl"
          >
            <input type="hidden" name="blockchain" value={blockchain} />
            <select
              className="p-2 text-sm text-black duration-300 md:rounded-l-md rounded-t-md md:rounded-tr-none"
              name="type"
            >
              <option value="address">Address</option>
              <option value="height">Block Height</option>
              <option value="hash">Block Hash</option>
              <option value="transaction">Transaction Hash</option>
              {chain?.features?.assetsEnabled && (
                <option value="asset">Asset Name</option>
              )}
            </select>
            <input
              type="text"
              className="md:-ml-[1px] w-full p-2 text-sm text-black placeholder:text-gray-500"
              placeholder={placeholder}
              name="query"
            />
            <button
              type="submit"
              className="md:-ml-[1px] p-2 rounded-tl-none rounded-tr-none select-none md:rounded-tr-md rounded-b-md md:rounded-bl-none bg-brand-600 hover:bg-brand-800 active:bg-brand-800 focus:bg-brand-800 outline-none"
            >
              Search
            </button>
          </form>
        </Container>
      </div>
      <div className="py-4">{children}</div>
      <ToastContainer position="top-right" closeOnClick theme="colored"/>
    </>
  );
}
