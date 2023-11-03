import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Hyperbit</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-full p-6">
        <Image src="/images/logo.png" width="50" height="50" alt="Logo" />
        <h1 className="mt-2 mb-8 text-2xl font-medium">Hyperbit</h1>
        <div className="w-full max-w-sm mx-auto text-left border border-gray-200 divide-y rounded-lg">
          <Link href="/auth/register">
            <a className="block p-4 rounded-t-lg action:bg-brand-500 action:text-white">
              <h2 className="mb-1 font-semibold">Create a wallet</h2>
              <p className="text-sm">Start with a brand new wallet</p>
            </a>
          </Link>
          <Link href="/auth/login">
            <a className="block p-4 rounded-b-lg action:bg-brand-500 action:text-white">
              <h2 className="mb-1 font-semibold">Login</h2>
              <p className="text-sm">Access your existing wallets</p>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
