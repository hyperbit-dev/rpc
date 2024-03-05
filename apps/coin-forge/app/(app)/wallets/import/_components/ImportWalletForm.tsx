"use client";

"use client";
import { chains } from "@hyperbitjs/chains";
import Mnemonic, { Address } from "@hyperbitjs/mnemonic";
import {
  Button,
  Checkbox,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "@hyperbitui/react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import React, { KeyboardEvent, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { WalletSchema } from "../_lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { PouchDbWalletDoc, pouchClient } from "@/_lib/pouchdb";
import { ImportMnemonic } from "./ImportMnemonic";

export function ImportWalletForm() {
  const { data } = useSession();
  const form = useForm({
    resolver: zodResolver(WalletSchema),
    defaultValues: {
      step: "create",
      mnemonic: Array.from(new Array(12), () => ({ value: "" })),
    },
  });

  useEffect(() => {
    const handlePasteAnywhere = (event: any) => {
      if (event?.target?.name === "mnemonic.0.value") {
        const mnemonic = event.clipboardData.getData("text").split(" ");
        if (mnemonic.length > 1) {
          mnemonic.forEach((word: string, index: number) => {
            form.setValue(`mnemonic.${index}.value`, word);
          });
          setTimeout(() => {
            form.setValue(`mnemonic.0.value`, mnemonic[0]);
          });
        }
      }
    };

    window.addEventListener("paste", handlePasteAnywhere);

    return () => {
      window.removeEventListener("paste", handlePasteAnywhere);
    };
  }, [form]);

  async function handleSubmit({
    blockchain,
    mnemonic: words,
    network: networkName,
    name,
    passphrase,
  }: WalletSchema) {
    try {
      // @ts-ignore
      const network = chains[blockchain][networkName];
      const mnemonic = new Mnemonic({
        mnemonic: words.join(" "),
        network,
        passphrase,
      });

      const externalAddresses: Address[] = [];
      const changeAddresses: Address[] = [];

      mnemonic
        .generateAddresses({ count: 20, index: 0 })
        .forEach((addressPair) => {
          externalAddresses.push(addressPair.external);
          changeAddresses.push(addressPair.change);
        });

      const wallet: PouchDbWalletDoc = {
        _id: `wallet_${uuidv4()}`,
        // @ts-ignore
        userId: data?.user.id,
        chainId: network.id,
        name,
        data: {
          passphrase,
          mnemonic: mnemonic.toString(),
          externalAddresses,
          changeAddresses,
        },
      };
      // @ts.ignore
      const newWallet = await pouchClient.createWallet(wallet, data?.user?.id);
      console.log("newWallet", newWallet);
    } catch (e) {
      console.log("e", e);
    }
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

  const passphrase = form.watch("passphrase");

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(handleSubmit)} className="py-8">
        <FormGroup>
          <Label htmlFor="wallet-blockchain">Blockchain</Label>
          <Input asChild>
            <select
              {...form.register("blockchain")}
              id="wallet-blockchain"
              // Error={!!form.formState?.errors?.blockchain?.message}
            >
              <option value="">Select a blockchain...</option>
              {options.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Input>
          {form.formState?.errors?.blockchain?.message ? (
            <FormFeedback>
              {form.formState.errors.blockchain.message as string}
            </FormFeedback>
          ) : undefined}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="wallet-network">Network</Label>
          <Input asChild>
            <select
              {...form.register("network")}
              id="wallet-network"
              // Error={!!form.formState?.errors?.network?.message}
            >
              <option value="">Select a network...</option>
              <option value="mainnet">Mainnet</option>
              <option value="testnet">Testnet</option>
            </select>
          </Input>
          {form.formState?.errors?.network?.message ? (
            <FormFeedback>
              {form.formState.errors.network.message as string}
            </FormFeedback>
          ) : undefined}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="wallet-name">Name</Label>
          <Input
            {...form.register("name")}
            id="wallet-name"
            type="text"
            invalid={!!form.formState?.errors?.name?.message}
          />
          {form.formState?.errors?.name?.message ? (
            <FormFeedback>
              {form.formState.errors.name.message as string}
            </FormFeedback>
          ) : undefined}
        </FormGroup>
        <ImportMnemonic />
        <FormGroup>
          <Label htmlFor="wallet-passphrase">
            Passphrase <small className="pl-1">(optional)</small>
          </Label>
          <Input
            {...form.register("passphrase")}
            id="wallet-passphrase"
            type="password"
            invalid={!!form.formState?.errors?.passphrase?.message}
          />
          {form.formState?.errors?.passphrase?.message ? (
            <FormFeedback>
              {form.formState.errors.passphrase.message as string}
            </FormFeedback>
          ) : undefined}
        </FormGroup>
        <FormGroup className={clsx({ hidden: !passphrase?.length })}>
          <Label htmlFor="wallet-passphrase-confirm">Confirm Passphrase</Label>
          <Input
            {...form.register("passphraseConfirm")}
            id="wallet-passphrase-confirm"
            type="password"
            invalid={!!form.formState?.errors?.passphraseConfirm?.message}
          />
          {form.formState?.errors?.passphraseConfirm?.message ? (
            <FormFeedback>
              {form.formState.errors.passphraseConfirm.message as string}
            </FormFeedback>
          ) : undefined}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="wallet-terms">
            <Checkbox
              {...form.register("terms")}
              id="wallet-terms"
              type="checkbox"
              invalid={!!form.formState?.errors?.terms?.message}
            />
            <span className="text-sm">I Agree To The Terms & Conditions</span>
          </Label>
          {form.formState?.errors?.terms?.message ? (
            <FormFeedback>
              {form.formState.errors.terms.message as string}
            </FormFeedback>
          ) : undefined}
        </FormGroup>
        <hr className="my-8" />
        <div className="flex flex-col flex-col-reverse gap-4 sm:flex-row">
          <Button
            type="submit"
            className="flex-1"
            size="sm"
            width="full"
            outline
            variant="secondary"
            disabled={form.formState.isSubmitting}
            asChild
          >
            <Link href="/wallets" className="flex items-center justify-center">
              Back to Wallets
            </Link>
          </Button>
          <Button
            type="submit"
            className="flex-1"
            width="full"
            disabled={form.formState.isSubmitting}
          >
            Create Wallet
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
}
