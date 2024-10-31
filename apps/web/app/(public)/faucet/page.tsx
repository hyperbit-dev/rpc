"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormGroup, Input, Label } from "@hyperbit-private/react";
import { QueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fetchClient } from "@/_api/client/fetchClient";
import { Container } from "~/_components/Container";
import { NextLink } from "~/_components/NextLink";

const BLOCKCHAIN_OPTIONS = [
  { label: "Ravencoin", value: "trvn" },
  {
    label: "Evrmore",
    value: "tevr",
  },
];

const FaucetSchema = z.object({
  blockchain: z.string(),
  address: z.string(),
  asset: z.string().optional(),
});

type FaucetSchema = z.infer<typeof FaucetSchema>;

export default function FaucetPage() {
  const [faucetBalance, setFaucetBalance] = useState<any>({});
  const [successResponse, setSuccessResponse] = useState<unknown[]>([]);
  const [errorResponse, setErrorResponse] = useState<unknown | undefined>();
  const recaptchaRef = useRef();
  const form = useForm<FaucetSchema>({
    resolver: zodResolver(FaucetSchema),
    defaultValues: {
      blockchain: "trvn",
    },
  });

  const blockchain = form.watch("blockchain");
  const address = form.watch("address");
  const asset = form.watch("asset");

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("blockchain", blockchain);
    const url = `/api/v1/faucet/balance?${searchParams.toString()}`;
    fetch(url, {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFaucetBalance(res);
      });
  }, [blockchain]);

  function handleCopy(value: string) {
    navigator.clipboard.writeText(value);
    alert("Copied Transaction ID: " + value);
  }

  const onReCAPTCHAChange = async (captcha: any) => {
    setErrorResponse(undefined);
    try {
      const data = {
        blockchain,
        address,
        asset,
        captcha,
      };

      const response: any = await fetchClient(`/api/v1/faucet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setSuccessResponse((prev) => [...prev, { ...response, blockchain }]);
      const queryClient = new QueryClient();
      queryClient.invalidateQueries({ queryKey: ["faucet"] });
    } catch (error) {
      setErrorResponse((error as Error).message);
    } finally {
      // Reset the reCAPTCHA when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.
      // @ts-ignore
      window.grecaptcha.reset();
    }
  };

  async function handleSubmit() {
    if (recaptchaRef?.current) {
      // @ts-ignore
      await recaptchaRef.current.execute();
    }
  }

  const assets = faucetBalance?.assets
    ? Object.keys(faucetBalance.assets).reduce(
        (assets: any[], assetName: any) => {
          if (
            assetName.endsWith("!") ||
            assetName.startsWith("$") ||
            assetName.startsWith("#")
          ) {
            return assets;
          }
          return [
            ...assets,
            {
              name: assetName,
              value: faucetBalance.assets[assetName],
            },
          ];
        },
        [],
      )
    : [];

  return (
    <Container>
      <div className="max-w-lg mx-auto my-12">
        <h1 className="mb-2 text-4xl font-bold text-center">Testnet Faucet</h1>
        <p className="mb-4 text-lg leading-tight text-center">
          Enter your testnet address to receive additional funds.
        </p>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* @ts-ignore */}
          <ReCAPTCHA
            // @ts-ignore
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={onReCAPTCHAChange}
          />
          <FormGroup>
            <Label htmlFor="blockchain">Blockchain</Label>
            <Input asChild>
              <select
                {...form.register("blockchain")}
                id="blockchain"
                name="blockchain"
                disabled={form.formState.isSubmitting}
                required
              >
                {BLOCKCHAIN_OPTIONS.map(({ label, value }) => {
                  return (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </Input>

            {faucetBalance ? (
              <>
                <div className="flex flex-col mt-1">
                  {typeof faucetBalance.address === "string" ? (
                    <small>Refill Address: {faucetBalance.address}</small>
                  ) : undefined}

                  {typeof faucetBalance.balance === "number" ? (
                    <small>Faucet Balance: {faucetBalance.balance}</small>
                  ) : undefined}
                </div>
                {assets.length ? (
                  <FormGroup className="mt-4">
                    <Label>Asset (Optional)</Label>
                    <Input asChild>
                      <select {...form.register("asset")}>
                        <option value="">Add an asset...</option>
                        {assets.map((asset: any) => (
                          <option key={asset} value={asset.name}>
                            {asset.name}
                          </option>
                        ))}
                      </select>
                    </Input>
                  </FormGroup>
                ) : undefined}
              </>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Label>Send to</Label>
            <Input
              {...form.register("address")}
              placeholder="Wallet address..."
            />
            {!!errorResponse && typeof errorResponse === "string" ? (
              <span className="text-sm text-red-500">{errorResponse}</span>
            ) : undefined}
          </FormGroup>
          <FormGroup className="mt-8 text-center">
            <Button
              type="submit"
              fullWidth
              disabled={
                form.formState.isSubmitting || faucetBalance?.balance === 0
              }
            >
              {form.formState.isSubmitting ? (
                <svg
                  className="w-5 h-5 mx-4 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Submit"
              )}
            </Button>
          </FormGroup>
        </form>
        {successResponse?.length ? (
          <>
            <div className="border border-gray-200 divide-y rounded">
              {successResponse.map((tx: any) => (
                <div
                  key={tx.txid}
                  className="flex items-center justify-between p-2"
                >
                  <dl className="grid grid-cols-[100px_auto] gap-y-1">
                    <dt className="text-xs">ID</dt>
                    <dd className="flex items-center gap-2 text-xs">
                      <NextLink
                        className="text-brand-500 hover:text-brand-600"
                        href={`/explorers/${tx.blockchain}/transactions/${tx.txid}`}
                      >
                        {`${tx.txid.substring(0, 15)}...${tx.txid.substring(
                          tx.txid.length - 15,
                          tx.txid.length,
                        )}`}
                      </NextLink>

                      <button type="button" onClick={() => handleCopy(tx.txid)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15px"
                          height="15px"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="#000000"
                            d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"
                          />
                          <path
                            fill="#000000"
                            d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"
                          />
                        </svg>
                      </button>
                    </dd>
                    <dt className="text-xs">Amount</dt>
                    <dd className="text-xs">{Math.abs(tx.amount)}</dd>
                    {tx?.assetTransfers?.length
                      ? tx.assetTransfers.map((at: string) => (
                          <Fragment key={at}>
                            <dt className="text-xs">Asset</dt>
                            <dd className="flex items-center gap-2 text-xs">
                              <NextLink
                                className="text-brand-500 hover:text-brand-600"
                                href={`/explorers/${tx.blockchain}/transactions/${at}`}
                              >
                                {`${at.substring(0, 15)}...${at.substring(
                                  at.length - 15,
                                  at.length,
                                )}`}
                              </NextLink>
                              <button
                                type="button"
                                onClick={() => handleCopy(at)}
                              >
                                <svg
                                  width="15px"
                                  height="15px"
                                  viewBox="0 0 1024 1024"
                                >
                                  <path
                                    fill="#000000"
                                    d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"
                                  />
                                  <path
                                    fill="#000000"
                                    d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"
                                  />
                                </svg>
                              </button>
                            </dd>
                          </Fragment>
                        ))
                      : undefined}
                  </dl>
                </div>
              ))}
            </div>
          </>
        ) : undefined}
      </div>
    </Container>
  );
}
