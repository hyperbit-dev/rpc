"use client";
import { chains } from "@hyperbitjs/chains";
import {
  Button,
  Form,
  FormError,
  FormRow,
  Input,
  Label,
  SectionCard,
  Select,
} from "@/components";
import { Wallet } from "@/services/wallet";
import React, { useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { WalletSchema } from "../schema";
import clsx from "clsx";
import { DbWallet } from "@/lib/db/wallet/types";

type CreateMnemonicProps = {
  setWallet: (wallet: Wallet) => void;
};

export function CreateMnemonic({ setWallet }: CreateMnemonicProps) {
  const form = useFormContext();

  async function handleSubmit({
    blockchain,
    network: networkName,
    name,
    passphrase,
  }: WalletSchema) {
    // @ts-ignore
    const network = chains[blockchain][networkName];
    const dbWallet = (await fetch("/api/v1/wallets", {
      method: "POST",
      body: JSON.stringify({ name, blockchainId: network.id, passphrase }),
    }).then((res) => res.json())) as unknown as DbWallet;

    const wallet = new Wallet({
      id: dbWallet.id,
      name: dbWallet.name,
      passphrase,
      network,
    });
    wallet.init();
    setWallet(wallet);

    // form.setValue("step", "summary");
  }

  const options = useMemo(() => {
    const options = Object.keys(chains)
      .map((chain: any) => {
        const name: string = (chains as any)[chain].mainnet.name;
        return {
          label: name.match(/[A-Z][a-z]+/g)?.join(" ") ?? name,
          value: chain,
          networks: (chains as any)[chain],
        };
      })
      .filter((chain) => !!chain.networks.mainnet.messagePrefix);
    return options;
  }, []);

  // const blockchain = form.watch("blockchain");
  // const network = form.watch("network");
  // const name = form.watch("name");
  // const passphrase = form.watch("passphrase");

  // const words = wallet ? wallet.mnemonic.words : undefined;

  console.log("form", form.formState.errors);
  const passphrase = form.watch("passphrase");

  return (
    <SectionCard>
      <Form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormRow Label="Blockchain">
          <Select
            {...form.register("blockchain")}
            Error={!!form.formState?.errors?.blockchain?.message}
          >
            <option value="">Select a blockchain...</option>
            {options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {form.formState?.errors?.blockchain?.message ? (
            <FormError>
              {form.formState.errors.blockchain.message as string}
            </FormError>
          ) : undefined}
        </FormRow>
        <FormRow Label="Network">
          <Select
            {...form.register("network")}
            Error={!!form.formState?.errors?.network?.message}
          >
            <option value="">Select a network...</option>
            <option value="mainnet">Mainnet</option>
            <option value="testnet">Testnet</option>
          </Select>
          {form.formState?.errors?.network?.message ? (
            <FormError>
              {form.formState.errors.network.message as string}
            </FormError>
          ) : undefined}
        </FormRow>
        <FormRow id="wallet-name" Label="Name">
          <Input
            type="text"
            {...form.register("name")}
            Error={!!form.formState?.errors?.name?.message}
          />
          {form.formState?.errors?.name?.message ? (
            <FormError>
              {form.formState.errors.name.message as string}
            </FormError>
          ) : undefined}
        </FormRow>
        <FormRow id="wallet-passphrase" Label="Passphrase (optional)">
          <Input
            type="password"
            {...form.register("passphrase")}
            Error={!!form.formState?.errors?.passphrase?.message}
          />
          {form.formState?.errors?.passphrase?.message ? (
            <FormError>
              {form.formState.errors.passphrase.message as string}
            </FormError>
          ) : undefined}
        </FormRow>
        <FormRow
          id="wallet-passphrase-confirm"
          Label="Confirm Passphrase"
          className={clsx({ hidden: !passphrase?.length })}
        >
          <Input
            type="password"
            {...form.register("passphraseConfirm")}
            Error={!!form.formState?.errors?.passphraseConfirm?.message}
          />
          {form.formState?.errors?.passphraseConfirm?.message ? (
            <FormError>
              {form.formState.errors.passphraseConfirm.message as string}
            </FormError>
          ) : undefined}
        </FormRow>
        <FormRow>
          <Label htmlFor="wallet-terms" className="flex gap-2">
            <Input
              id="wallet-terms"
              type="checkbox"
              {...form.register("termsAndConditions")}
              Error={!!form.formState?.errors?.termsAndConditions?.message}
            />
            <span className="text-sm">I Agree To The Terms & Conditions</span>
          </Label>
          {form.formState?.errors?.termsAndConditions?.message ? (
            <FormError>
              {form.formState.errors.termsAndConditions.message as string}
            </FormError>
          ) : undefined}
        </FormRow>
        <Button
          type="submit"
          Width="full"
          disabled={form.formState.isSubmitting}
        >
          Create Wallet
        </Button>
      </Form>
      {/* {words?.length ? (
        <>
          <SectionCard>
            <div className="flex flex-row items-start gap-2">
              <QRGenerator id="wallet-words" value={words.join(" ")} />
              <div className="hidden">
                <QRGenerator
                  id="wallet-xpriv"
                  value={wallet?.mnemonic?.toHDPrivateKey().toJSON().xpriv}
                />
                <QRGenerator
                  id="wallet-xpub"
                  value={wallet?.mnemonic?.toHDPrivateKey().toJSON().xpub}
                />
                <QRGenerator
                  id="wallet-coinkey-publicaddress"
                  value={wallet.mnemonic?.getCoinKey().publicAddress}
                />
                <QRGenerator
                  id="wallet-coinkey-privatewif"
                  value={wallet.mnemonic?.getCoinKey().privateWif}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>Scan your words to your phone or</div>
                <PDFDownloadLink
                  className="inline-block p-2 text-center text-white rounded bg-brand-500"
                  document={
                    <WalletDocument
                      passphrase={passphrase}
                      wallet={wallet}
                      network={network}
                    />
                  }
                  fileName={`${blockchain}-${network}-${name}.pdf`}
                >
                  {({ loading }) =>
                    loading ? "Loading document..." : "Download PDF"
                  }
                </PDFDownloadLink>
              </div>
            </div>
          </SectionCard>
        </>
      ) : undefined} */}
    </SectionCard>
  );
}
