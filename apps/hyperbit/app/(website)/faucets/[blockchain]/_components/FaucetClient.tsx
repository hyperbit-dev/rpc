"use client";

import { getNetwork } from "@/lib/blockchain/network";
import { Button, FormGroup, Input, Label } from "@hyperbitui/react";
import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, createRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FaucetContainer } from "./FaucetContainer";
import { Divider, PageHeader, Select } from "@/components";
import { FaucetBalance } from "@/app/api/v1/[blockchain]/faucet/_types";

const MIN = 100;
const MAX = 10000;
const VALID_BLOCKCHAINS = ["trvn", "tevr"];

type FaucetProps = {
  blockchain: string;
  faucet: FaucetBalance;
};

export default function FaucetClient({ blockchain, faucet }: FaucetProps) {
  const [coins, setCoins] = useState<number>(100);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);
  const blockchainRef = createRef<HTMLSelectElement>();
  const assetsRef = createRef<HTMLSelectElement>();
  const destinationRef = createRef<HTMLInputElement>();
  const amountRef = createRef<HTMLInputElement>();
  const recaptchaRef = createRef();

  const blockchainName = getNetwork(blockchain)?.name;
  const balance = faucet?.balance ? Number(faucet.balance) : 0;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (value > 0 && value <= MAX) {
      setCoins(value);
    }
  }

  // onchange request balance

  const onReCAPTCHAChange = async (captchaCode: any) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setResponse(null);

    const address = destinationRef.current?.value ?? "";
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
    if (recaptchaRef?.current) {
      // @ts-ignore
      recaptchaRef.current.execute();
    }
  }

  if (!blockchainName) {
    return (
      <FaucetContainer>
        <PageHeader>Faucet Not Found</PageHeader>
        <p className="mb-4">
          There was a problem loading the faucet. If the issue persists, contact
          us at <a href="mailto:support@hyperbit.app">support@hyperbit.app</a>
        </p>
      </FaucetContainer>
    );
  }

  return (
    <>
      <Head>
        <title>{blockchainName} Testnet Faucet</title>
        <meta
          name="description"
          content="testnet coins distributed via a faucet for development usage"
          key="desc"
        />
        <meta name="keywords" content="testnet, faucet" />
      </Head>
      <FaucetContainer>
        <PageHeader>{blockchainName} Testnet Faucet</PageHeader>
        <p className="mb-4">
          Enter your {blockchainName} Testnet address to receive additional
          funds.
          <br />
          You can request up to {MAX.toLocaleString()} coins every 24 hours.
        </p>
        <form onSubmit={handleSubmit}>
          <ReCAPTCHA
            // @ts-ignore
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={onReCAPTCHAChange}
          />
          <FormGroup>
            <Label htmlFor="blockchain">Blockchain</Label>
            <Select
              id="blockchain"
              name="blockchain"
              disabled={isSubmitting}
              ref={blockchainRef}
              required
            >
              {VALID_BLOCKCHAINS.map((value) => {
                const name = getNetwork(value)?.name;
                return (
                  <option key={value} value={value}>
                    {name} (Testnet)
                  </option>
                );
              })}
            </Select>
          </FormGroup>
          {Object.keys(faucet?.assets)?.length ? (
            <FormGroup>
              <Label htmlFor="assets">Assets (optional)</Label>
              <Select
                id="assets"
                name="assets"
                disabled={isSubmitting}
                ref={assetsRef}
                required
              >
                <option key="" value="">
                  Select an asset...
                </option>
                {Object.keys(faucet.assets).map((key) => {
                  return (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  );
                })}
              </Select>
            </FormGroup>
          ) : undefined}
          <FormGroup>
            <Label htmlFor="destination">Testnet Address</Label>
            <Input
              id="destination"
              type="text"
              name="destination"
              placeholder={faucet?.address}
              disabled={isSubmitting}
              ref={destinationRef}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min={MIN}
              max="10000"
              value={coins}
              onChange={handleChange}
              disabled={isSubmitting}
              ref={amountRef}
              required
            />
            <div className="mt-1 text-sm text-left">
              Current Balance: {balance} {blockchain}
            </div>
            <ul className="flex justify-start gap-2 mt-2">
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
          </FormGroup>
          <Divider />
          <FormGroup>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              fullWidth
            >
              Request Funds
            </Button>
          </FormGroup>
          <FormGroup>
            <p>
              <small>
                Keep this faucet funded by sending unused coins to:
                <br />
                {faucet?.address}
              </small>
            </p>
          </FormGroup>
          {response && (
            <div className="my-4 text-sm">
              <p>Request successful!</p>
              <p className="mb-2">Transaction ID:</p>
              <Link
                className="block p-2 duration-300 bg-gray-100 border border-gray-300 rounded text-buttercup-500 hover:bg-brand-500 hover:text-white ease"
                href={`/explorers/${blockchain}/transactions/${response}`}
              >
                {response}
              </Link>
            </div>
          )}
        </form>
      </FaucetContainer>
    </>
  );
}
