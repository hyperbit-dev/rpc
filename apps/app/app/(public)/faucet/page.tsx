"use client";
import Head from "next/head";
import { FaucetPageClient } from "./_components/FaucetClient";

export default function FaucetPage() {
  return (
    <>
      <Head>
        <title>Testnet Faucet</title>
        <meta
          name="description"
          content="testnet coins distributed via a faucet for development usage"
          key="desc"
        />
        <meta name="keywords" content="testnet, faucet" />
      </Head>
      <FaucetPageClient />
    </>
  );
}
