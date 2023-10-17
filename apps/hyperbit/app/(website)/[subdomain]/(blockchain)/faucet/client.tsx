"use client";

import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, createRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const MIN = 100;
const MAX = 10000;

type FaucetProps = {
  blockchain: string;
  balance: number;
};

export default function FaucetClient({ blockchain, balance }: FaucetProps) {
  const [coins, setCoins] = useState<number>(100);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);
  const addressRef = createRef<HTMLInputElement>();
  const amountRef = createRef<HTMLInputElement>();
  const recaptchaRef = createRef();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (value > 0 && value <= MAX) {
      setCoins(value);
    }
  }

  const onReCAPTCHAChange = async (captchaCode: any) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setResponse(null);

    const address = addressRef.current?.value ?? "";
    const amount = amountRef.current?.value ?? 0;

    try {
      const data = {
        coin: process.env.NEXT_PUBLIC_BLOCKCHAIN_TICKER,
        address,
        amount,
        captcha: captchaCode,
      };
      const response = await fetch(`/api/v1/${blockchain}/faucet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();

        setIsSubmitting(false);
        setResponse(result.transactionId);
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error?.message);
      }
    } catch (error) {
      alert((error as Error)?.message ?? "Something went wrong");
    } finally {
      setIsSubmitting(false);
      // Reset the reCAPTCHA when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.
      // @ts-ignore
      window.grecaptcha.reset();
    }
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Execute the reCAPTCHA when the form is submitted
    // @ts-ignore
    recaptchaRef.current.execute();
  }

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_BLOCKCHAIN_DISPLAY_NAME} Testnet Faucet
        </title>
        <meta
          name="description"
          content="testnet coins distributed via a faucet for development usage"
          key="desc"
        />
        <meta name="keywords" content="testnet, faucet" />
      </Head>
      <div className="max-w-xl px-4 mx-auto text-center">
        <h1 className="mt-8 mb-4 text-2xl">
          {process.env.NEXT_PUBLIC_BLOCKCHAIN_DISPLAY_NAME} Testnet Faucet
        </h1>
        <p className="mb-4">
          Enter your {process.env.NEXT_PUBLIC_BLOCKCHAIN_DISPLAY_NAME} Testnet
          address to receive additional funds.
          <br />
          You can request up to {MAX.toLocaleString()} coins every 24 hours.
        </p>
        <form onSubmit={handleSubmit}>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={onReCAPTCHAChange}
          />
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <label htmlFor="address" aria-hidden="true" className="hidden">
                Your Testnet Address (e.g. msBBUYWZi6TNS1a8nGsUswdH2QxfhKrKQk)
              </label>
              <input
                id="address"
                type="text"
                name="address"
                className="w-full p-3 border border-gray-200 rounded-md"
                placeholder="Your Testnet Address (e.g. msBBUYWZi6TNS1a8nGsUswdH2QxfhKrKQk)"
                disabled={isSubmitting}
                ref={addressRef}
                required
              />
            </div>
            <div>
              <label htmlFor="amount" aria-hidden="true" className="hidden">
                Coin Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                className="p-3 border border-gray-200 rounded-md"
                min={MIN}
                max="10000"
                value={coins}
                onChange={handleChange}
                disabled={isSubmitting}
                ref={amountRef}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <ul className="flex justify-center gap-2 mt-2">
              <li>
                <button
                  className="px-2 py-1 text-sm leading-none bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-300 focus:bg-gray-300"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setCoins(MIN)}
                >
                  {MIN}
                </button>
              </li>
              <li>
                <button
                  className="px-2 py-1 text-sm leading-none bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-300 focus:bg-gray-300"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setCoins(500)}
                >
                  500
                </button>
              </li>
              <li>
                <button
                  className="px-2 py-1 text-sm leading-none bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-300 focus:bg-gray-300"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setCoins(1000)}
                >
                  1000
                </button>
              </li>
              <li>
                <button
                  className="px-2 py-1 text-sm leading-none bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-300 focus:bg-gray-300"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setCoins(MAX)}
                >
                  {MAX}
                </button>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-2 text-sm text-white duration-300 bg-brand-500 rounded-md hover:bg-brand-600 focus:bg-brand-600 active:bg-brand-600 ease disabled:opacity-50"
            >
              Request Funds
            </button>
          </div>
          {/* <Text>
            <small>
              Read carefully these{" "}
              <Link href="/terms">terms and conditions</Link> before claiming
              cryptocurrency.
            </small>
          </Text> */}
          <p className="mb-4">
            <small>
              Keep this faucet funded by sending unused coins to:
              <br />
              msBBUYWZi6TNS1a8nGsUswdH2QxfhKrKQk
            </small>
          </p>
          <div className="inline-block px-6 py-3 text-sm bg-gray-100 border border-gray-200 rounded-lg">
            Faucet Balance:
            <br />
            {balance}
          </div>
          {response && (
            <div className="my-4 text-sm">
              <p>Request successful!</p>
              <p className="mb-2">Transaction ID:</p>
              <Link
                className="block p-2 duration-300 bg-gray-100 border border-gray-300 rounded text-buttercup-500 hover:bg-brand-500 hover:text-white ease"
                href={`/explorer/transactions/${response}`}
              >
                {response}
              </Link>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
