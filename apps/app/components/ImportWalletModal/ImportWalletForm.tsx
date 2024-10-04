import { Wallet } from "@hyperbitjs-private/wallet";
import { useFormContext } from "react-hook-form";
import {
  Checkbox,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Select,
  Textarea,
} from "../forms";
import { ModalOverflow, useModal } from "../modal";
import { ImportWalletSchema } from "./schema";
import { useState } from "react";
import clsx from "clsx";
import { useCreateWalletMutation } from "@/lib/queries/wallets";
import { Button } from "../base";
import { useListBlockchainsQuery } from "@/lib/queries";
import { chains, MainNet, TestNet } from "@hyperbitjs/chains";

export function ImportWalletForm() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const createWalletMutation = useCreateWalletMutation();

  const listBlockchainsQuery = useListBlockchainsQuery({});
  const blockchains = listBlockchainsQuery.data ?? [];

  const form = useFormContext<ImportWalletSchema>();
  const { handleClose } = useModal();

  const blockchainOptions = blockchains
    .map((blockchain: any) => ({
      label: blockchain.name,
      value: blockchain.id,
    }))
    .reduce((acc: any, cur: any) => {
      return acc.find((x: any) => x.label === cur.label) ? acc : [...acc, cur];
    }, [])
    .sort((a: any, b: any) => a.label.localeCompare(b.label));

  const passphrase = form.watch("passphrase");

  async function handleSubmit({
    blockchainId,
    mnemonic,
    network: networkName,
    label,
    passphrase,
  }: ImportWalletSchema) {
    try {
      const blockchain = blockchains.find((x: any) => x.id === blockchainId);
      const network = blockchain.networks.find(
        (x: any) => x.name === networkName
      );

      const walletNetwork = chains[blockchain.symbol][network.name];
      const wallet = new Wallet({
        database: "hyperbit",
      });

      await wallet.init({
        label,
        passphrase,
        mnemonic,
        // @ts-ignore
        network: walletNetwork,
      });

      const res = await createWalletMutation.mutateAsync({
        externalId: wallet.id,
        label: wallet.label,
        blockchainId: blockchainId,
        networkId: network.id,
      });

      form.reset();
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <ModalOverflow asChild>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormGroup>
            <Label>Blockchain</Label>
            <Select {...form.register("blockchainId")}>
              <option value="">Select a blockchain...</option>
              {blockchainOptions.map((option: any) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {form.formState?.errors?.blockchainId?.message ? (
              <FormFeedback className="text-sm">
                {form.formState.errors.blockchainId.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Label>Label</Label>
            <Input type="text" {...form.register("label")} />
            {form.formState?.errors?.label?.message ? (
              <FormFeedback className="text-sm">
                {form.formState.errors.label.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Label>Mnemonic (Seed Phrase)</Label>
            <Textarea rows={3} {...form.register("mnemonic")} />
            {form.formState?.errors?.mnemonic?.message ? (
              <FormFeedback className="text-sm">
                {form.formState.errors.mnemonic.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup className="mb-6 border-b border-gray-200">
            <button
              type="button"
              className="flex items-center justify-between w-full text-sm p-2"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>{showAdvanced ? "Hide" : "Show"} Advanced Options</span>
              {showAdvanced ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              )}
            </button>
          </FormGroup>
          {showAdvanced ? (
            <>
              <FormGroup>
                <Label>Passphrase</Label>
                <Input type="password" {...form.register("passphrase")} />
                {form.formState?.errors?.passphrase?.message ? (
                  <FormFeedback className="text-sm">
                    {form.formState.errors.passphrase.message as string}
                  </FormFeedback>
                ) : undefined}
              </FormGroup>
              <FormGroup className={clsx({ hidden: !passphrase?.length })}>
                <Label>Confirm Passphrase</Label>
                <Input
                  type="password"
                  {...form.register("passphraseConfirm")}
                />
                {form.formState?.errors?.passphraseConfirm?.message ? (
                  <FormFeedback className="text-sm">
                    {form.formState.errors.passphraseConfirm.message as string}
                  </FormFeedback>
                ) : undefined}
              </FormGroup>
              <FormGroup>
                <Label>Network</Label>
                <Select {...form.register("network")}>
                  <option value="">Select a network...</option>
                  <option value="mainnet">Mainnet</option>
                  <option value="testnet">Testnet</option>
                </Select>
                {form.formState?.errors?.network?.message ? (
                  <FormFeedback className="text-sm">
                    {form.formState.errors.network.message as string}
                  </FormFeedback>
                ) : undefined}
              </FormGroup>
            </>
          ) : undefined}
          <FormGroup>
            <Checkbox {...form.register("termsAndConditions")}>
              I agree to the Terms & Conditions
            </Checkbox>
            {form.formState?.errors?.termsAndConditions?.message ? (
              <div>
                <FormFeedback className="text-sm">
                  {form.formState.errors.termsAndConditions.message as string}
                </FormFeedback>
              </div>
            ) : undefined}
          </FormGroup>
        </form>
      </ModalOverflow>
      <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
        <Button type="button" onClick={() => handleClose()} Variant="outline">
          Cancel
        </Button>
        <Button onClick={form.handleSubmit(handleSubmit)}>Import</Button>
      </div>
    </>
  );
}
