import { Button } from "@hyperbit-private/react";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { Container } from "~/_components/Container";
import { search } from "./actions";

import { config } from "~/_config";
import "react-toastify/dist/ReactToastify.css";

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
    ? "Search for blocks, transactions, and addresses..."
    : "Search for blocks, transactions, addresses, and assets...";

  return (
    <>
      <div className="mb-4 bg-gray-900 border-b border-gray-200">
        <Container>
          <form
            action={search}
            className="grid md:grid-cols-[175px_175px_auto_150px] my-3 text-white rounded-md"
          >
            <select
              className="p-3 text-sm text-white duration-300 bg-transparent bg-gray-900 md:rounded-l-md rounded-t-md md:rounded-tr-none"
              name="type"
            >
              <option className="bg-gray-900" value="address">
                Address
              </option>
              <option className="bg-gray-900" value="height">
                Block Height
              </option>
              <option className="bg-gray-900" value="hash">
                Block Hash
              </option>
              <option className="bg-gray-900" value="transaction">
                Transaction Hash
              </option>
              {chain?.features?.assetsEnabled && (
                <option className="bg-gray-900" value="asset">
                  Asset Name
                </option>
              )}
            </select>
            <select
              className="p-3 text-sm text-white duration-300 bg-transparent bg-gray-900"
              defaultValue={blockchain}
              name="blockchain"
            >
              <option className="bg-gray-900" value="trvn">
                Ravencoin (Testnet)
              </option>
              <option className="bg-gray-900" value="mewc">
                Meowcoin
              </option>
              <option className="bg-gray-900" value="tmewc">
                Meowcoin (Testnet)
              </option>
              <option className="bg-gray-900" value="tevr">
                Evrmore (Testnet)
              </option>
            </select>
            <input
              type="text"
              className="w-full p-3 text-sm text-white bg-transparent border-gray-500 placeholder:text-white"
              placeholder={placeholder}
              name="query"
            />
            <Button
              type="submit"
              className="px-8 rounded-tl-none rounded-tr-none select-none md:rounded-tr-md rounded-b-md md:rounded-bl-none"
            >
              Search
            </Button>
          </form>
        </Container>
      </div>
      {children}
      {/* @ts-ignore */}
      <ToastContainer style={{ maxWidth: "200px", textAlign: "center" }} />
    </>
  );
}
