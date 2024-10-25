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
} from "@hyperbit-private/react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { WalletSchema } from "../_lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { PouchDbWalletDoc, pouchClient } from "@/_lib/pouchdb";

export function CreateWalletForm() {
  const { data } = useSession();
  const form = useForm({
    resolver: zodResolver(WalletSchema),
  });

  async function handleSubmit({
    blockchain,
    network: networkName,
    name,
    passphrase,
  }: WalletSchema) {
    try {
      // @ts-ignore
      const network = chains[blockchain][networkName];
      const mnemonic = new Mnemonic({
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
      // const newWallet = await pouchClient.createWallet(wallet, data?.user?.id);
      // console.log("newWallet", newWallet);
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
    <>
      {/* @ts-ignore */}
      <Form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormGroup>
          <Label htmlFor="wallet-blockchain">Blockchain</Label>
          <Input asChild>
            <select {...form.register("blockchain")} id="wallet-blockchain">
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
            <select {...form.register("network")} id="wallet-network">
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
            fullWidth
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
            fullWidth
            disabled={form.formState.isSubmitting}
          >
            Create Wallet
          </Button>
        </div>
      </Form>
    </>
  );
}
