"use client";
import { chains } from "@hyperbitjs/chains";
import {
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Textarea,
} from "@hyperbitui/react";
import clsx from "clsx";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ImportWalletSchema } from "./schema";

export function ImportWalletForm() {
  const form = useFormContext<ImportWalletSchema>();

  const options = useMemo(() => {
    const options = Object.keys(chains)
      .map((chain) => {
        const name: string = chains[chain].mainnet.name;
        return {
          label: name.match(/[A-Z][a-z]+/g)?.join(" ") ?? name,
          value: chain,
          networks: chains[chain],
        };
      })
      .filter((chain) => !!chain.networks.mainnet.messagePrefix);
    return options;
  }, []);

  const passphrase = form.watch("passphrase");

  return (
    <>
      <FormGroup>
        <Label>Blockchain</Label>
        <Input asChild>
          <select {...form.register("blockchain")}>
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
        <Label>Network</Label>
        <Input asChild>
          <select {...form.register("network")}>
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
      <FormGroup id="wallet-label">
        <Label>Label</Label>
        <Input type="text" {...form.register("label")} />
        {form.formState?.errors?.label?.message ? (
          <FormFeedback>
            {form.formState.errors.label.message as string}
          </FormFeedback>
        ) : undefined}
      </FormGroup>
      <FormGroup>
        <Label>Seed Phrase (mnemonic)</Label>
        <Textarea id="wallet-phrase" {...form.register("mnemonic")} />
        {form.formState?.errors?.mnemonic?.message ? (
          <FormFeedback>
            {form.formState.errors.mnemonic.message as string}
          </FormFeedback>
        ) : undefined}
      </FormGroup>
      <FormGroup id="wallet-passphrase">
        <Label>Passphrase (optional)</Label>
        <Input type="password" {...form.register("passphrase")} />
        {form.formState?.errors?.passphrase?.message ? (
          <FormFeedback>
            {form.formState.errors.passphrase.message as string}
          </FormFeedback>
        ) : undefined}
      </FormGroup>
      <FormGroup
        id="wallet-passphrase-confirm"
        className={clsx({ hidden: !passphrase?.length })}
      >
        <Label>Confirm Passphrase</Label>

        <Input type="password" {...form.register("passphraseConfirm")} />
        {form.formState?.errors?.passphraseConfirm?.message ? (
          <FormFeedback>
            {form.formState.errors.passphraseConfirm.message as string}
          </FormFeedback>
        ) : undefined}
      </FormGroup>
    </>
  );
}
