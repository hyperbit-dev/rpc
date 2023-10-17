"use client";

import { Container } from "@/components";
import { ToastContainer } from "react-toastify";
import { search } from "./actions";

import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";
import { config } from "@/lib/config";

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { subdomain: string };
}) {
  const chain = config.chains[params.subdomain];
  const placeholder = chain.features.assetsEnabled
    ? "Search for blocks, transactions, and addresses..."
    : "Search for blocks, transactions, addresses, and assets...";

  return (
    <>
      <Container>
        <form
          action={search}
          className="flex my-4 divide-x rounded-md"
        >
          <select
            className="p-3 text-sm duration-300 border border-gray-200 rounded-l-md"
            name="type"
          >
            <option value="address">Address</option>
            <option value="height">Block Height</option>
            <option value="hash">Block Hash</option>
            <option value="transaction">Transaction Hash</option>
            {chain.features.assetsEnabled && (
              <option value="asset">Asset Name</option>
            )}
          </select>
          <input
            type="hidden"
            name="blockchain"
            defaultValue={params.subdomain}
          />
          <input
            type="text"
            className="w-full p-3 text-sm border border-gray-200"
            placeholder={placeholder}
            name="query"
          />
          <button
            type="submit"
            className="px-12 py-3 text-sm text-white duration-300 bg-brand-500 rounded-r-md hover:bg-brand-600 active:bg-brand-600 focus:bg-brand-600 ease"
          >
            Search
          </button>
        </form>
      </Container>
      {children}
      <ToastContainer style={{ maxWidth: "200px", textAlign: "center" }} />
    </>
  );
}
