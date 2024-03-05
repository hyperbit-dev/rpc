"use client";
import { chains } from "@hyperbitjs/chains";
import { Wallet } from "@hyperbitjs-private/wallet";
import {
  Button,
  Checkbox,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "@hyperbitui/react";
import * as RadixDialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { CreateWalletSchema } from "./schema";
import { useCreateWalletMutation } from "@/_api/client";

export default function CreateWalletForm() {
  const form = useFormContext<CreateWalletSchema>();

  const importWalletMutation = useCreateWalletMutation();

  async function handleSubmit({
    blockchain,
    network: networkName,
    label,
    passphrase,
  }: CreateWalletSchema) {
    const network = chains[blockchain][networkName];

    const wallet = new Wallet({
      label,
      passphrase,
      network,
      database: "hyperbit",
    });
    const data = wallet.toJSON({ scrub: true });

    try {
      await importWalletMutation.mutateAsync({
        externalId: data.id,
        label: data.label,
        chainId: network.id,
        accounts: data.accounts,
      });
      form.reset();
    } catch (err) {
      console.log("err", err);
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
      <Form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col flex-1 p-4"
      >
        <div className="flex-1">
          <FormGroup>
            <Label>Blockchain</Label>
            <Input
              asChild
            >
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
            <Input
              type="text"
              {...form.register("label")}
            />
            {form.formState?.errors?.label?.message ? (
              <FormFeedback>
                {form.formState.errors.label.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup id="wallet-passphrase">
            <Label>Passphrase (optional)</Label>
            <Input
              type="password"
              {...form.register("passphrase")}
            />
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

            <Input
              type="password"
              {...form.register("passphraseConfirm")}
            />
            {form.formState?.errors?.passphraseConfirm?.message ? (
              <FormFeedback>
                {form.formState.errors.passphraseConfirm.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Checkbox
              id="wallet-terms"
              type="checkbox"
              {...form.register("termsAndConditions")}
            >
              <span className="text-sm">I agree to the Terms & Conditions</span>
            </Checkbox>
            {form.formState?.errors?.termsAndConditions?.message ? (
              <FormFeedback>
                {form.formState.errors.termsAndConditions.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
        </div>
        <div className="px-4 pt-4 -mx-4 border-t border-gray-300">
          <div className="flex items-center justify-end gap-4">
            <RadixDialog.Close asChild>
              <Button size="sm" type="button" variant="secondary" outline>
                Cancel
              </Button>
            </RadixDialog.Close>
            <Button size="sm" type="submit">
              Create
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}
