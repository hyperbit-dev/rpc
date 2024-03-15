"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { chains } from "@hyperbitjs/chains";
import {
  Checkbox,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "@hyperbitui/react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CreateWalletSchema } from "./schema";

export function CreateWalletForm() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const form = useFormContext<CreateWalletSchema>();

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
      <FormGroup>
        <Label>Blockchain</Label>
        <Input asChild>
          <select {...form.register("blockchain")}>
            <option value="">Select a blockchain...</option>
            {options.map((option: any) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Input>
        {form.formState?.errors?.blockchain?.message ? (
          <FormFeedback className="text-sm">
            {form.formState.errors.blockchain.message as string}
          </FormFeedback>
        ) : undefined}
      </FormGroup>
      <FormGroup id="wallet-label">
        <Label>Label</Label>
        <Input type="text" {...form.register("label")} autoComplete='false' />
        {form.formState?.errors?.label?.message ? (
          <FormFeedback className="text-sm">
            {form.formState.errors.label.message as string}
          </FormFeedback>
        ) : undefined}
      </FormGroup>
      <FormGroup id="wallet-passphrase">
        <Label>Passphrase</Label>
        <Input type="password" {...form.register("passphrase")} />
        {form.formState?.errors?.passphrase?.message ? (
          <FormFeedback className="text-sm">
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
          <FormFeedback className="text-sm">
            {form.formState.errors.passphraseConfirm.message as string}
          </FormFeedback>
        ) : undefined}
      </FormGroup>
      <FormGroup className="mb-6">
        <button
          type="button"
          className="flex items-center justify-between w-full text-sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <span>{showAdvanced ? "Hide" : "Show"} Advanced Options</span>
          {showAdvanced ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>
      </FormGroup>
      {showAdvanced ? (
        <>
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
              <FormFeedback className="text-sm">
                {form.formState.errors.network.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
        </>
      ) : undefined}
      <FormGroup>
        <Checkbox
          id="wallet-terms"
          type="checkbox"
          {...form.register("termsAndConditions")}
        >
          <span className="text-sm">I agree to the Terms & Conditions</span>
        </Checkbox>
        {form.formState?.errors?.termsAndConditions?.message ? (
          <div>
            <FormFeedback className="text-sm">
              {form.formState.errors.termsAndConditions.message as string}
            </FormFeedback>
          </div>
        ) : undefined}
      </FormGroup>
    </>
  );
}
