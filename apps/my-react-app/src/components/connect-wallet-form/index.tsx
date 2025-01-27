import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { chains } from "@hyperbitjs/chains";
import { Wallet } from "@hyperbit-private/wallet";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useModal } from "~/hooks/use-modal";
import {
  useCreateWalletMutation,
  useImportAddressMutation,
  useListBlockchainsQuery,
} from "~/utils/queries";
import { FormGroup } from "../form-group";
import { Label } from "../label";
import { HelperText } from "../helper-text";
import { Input } from "../input";
import { Checkbox } from "../checkbox";
import { Select } from "../select";
import { Button } from "../button";
import { ConnectWalletSchema } from "./schema";
import { RadioGroup } from "../radio-group";
import { TextArea } from "../textarea";
import { Spinner } from "../spinner";
import { Alert } from "../alert";

export function ConnectWalletForm() {
  const [error, setError] = useState<string | undefined>();
  const createWalletMutation = useCreateWalletMutation();
  const importAddressMutation = useImportAddressMutation();

  const { onOpenChange } = useModal();

  const listBlockchainsQuery = useListBlockchainsQuery({});
  const blockchains = listBlockchainsQuery.data ?? [];

  const form = useForm<ConnectWalletSchema>({
    resolver: zodResolver(ConnectWalletSchema),
    defaultValues: {
      network: "mainnet",
      type: "create",
      passphrase: "",
      passphraseConfirm: "",
    },
  });

  const blockchainOptions = blockchains
    .map((blockchain: any) => ({
      label: blockchain.name,
      value: blockchain.id,
    }))
    .reduce((acc: any, cur: any) => {
      return acc.find((x: any) => x.label === cur.label) ? acc : [...acc, cur];
    }, [])
    .sort((a: any, b: any) => a.label.localeCompare(b.label));

  async function handleSubmit({
    blockchain,
    network: networkName,
    label,
    passphrase,
    ...values
  }: ConnectWalletSchema) {
    setError(undefined);
    try {
      const blockchain = blockchains.find(
        (x: any) => x.name === blockchain && x.network === networkName
      );

      const externalId = uuidv4();
      const dbWallet = await createWalletMutation.mutateAsync({
        externalId,
        label,
        blockchainId: blockchain.id,
      });

      const network = chains[blockchain.symbol][networkName];
      const wallet = new Wallet({
        database: "hyperbit",
      });

      try {
        await wallet.init({
          externalId: `wallet_${dbWallet.id}`,
          mnemonic:
            values.type === "import" ? values.mnemonic.trim() : undefined,
          passphrase,
          network,
          encryptionKey: dbWallet.encryptionKey,
        });
      } catch (error) {
        console.log("error", error);
      }

      const newAddresses = await wallet.generateAddress({
        index: 0,
        count: 10,
      });
      const addresses = newAddresses?.reduce((acc: any, address: any) => {
        acc.push({
          address: address.external.address,
          path: address.external.path,
        });
        acc.push({
          address: address.change.address,
          path: address.change.path,
        });
        return acc;
      }, []);
      await importAddressMutation.mutateAsync({
        addresses,
        walletId: dbWallet.id,
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      setError((error as Error).message);
    }
  }

  const isLoading = listBlockchainsQuery.isLoading;
  const isSubmitting = form.formState.isSubmitting;
  const type = form.watch("type");

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4 overflow-y-hidden flex-1"
      >
        {error ? <Alert Variant="danger">{error}</Alert> : undefined}
        <div className="overflow-y-auto flex flex-col gap-4 scrollbar-hide">
          <FormGroup>
            <RadioGroup
              Options={[
                {
                  label: "Create",
                  value: "create",
                },
                {
                  label: "Import",
                  value: "import",
                },
              ]}
              {...form.register("type")}
              disabled={isSubmitting}
            />
          </FormGroup>
          <FormGroup>
            <Label>Blockchain</Label>
            <Select {...form.register("blockchain")} disabled={isSubmitting}>
              <option value="">Select a blockchain...</option>
              {blockchainOptions.map((option: any) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {form.formState?.errors?.blockchain?.message ? (
              <HelperText Variant="error">
                {form.formState.errors.blockchain.message as string}
              </HelperText>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Label>Network</Label>
            <Select {...form.register("network")} disabled={isSubmitting}>
              <option value="">Select a network...</option>
              <option value="mainnet">Mainnet</option>
              <option value="testnet">Testnet</option>
            </Select>
            {form.formState?.errors?.network?.message ? (
              <HelperText Variant="error">
                {form.formState.errors.network.message as string}
              </HelperText>
            ) : undefined}
          </FormGroup>
          {type === "import" ? (
            <FormGroup>
              <Label>Seed Phrase (12 words)</Label>
              <TextArea
                {...form.register("mnemonic")}
                placeholder="Enter your seed phrase..."
                min={2}
                rows={2}
                disabled={isSubmitting}
              />
            </FormGroup>
          ) : undefined}
          <FormGroup>
            <Label>Label</Label>
            <Input
              type="text"
              {...form.register("label")}
              autoComplete="off"
              disabled={isSubmitting}
            />
            {form.formState?.errors?.label?.message ? (
              <HelperText Variant="error">
                {form.formState.errors.label.message as string}
              </HelperText>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Label>Passphrase (Optional)</Label>
            <Input
              type="password"
              {...form.register("passphrase")}
              autoComplete="new-password"
              disabled={isSubmitting}
            />
            {form.formState?.errors?.passphrase?.message ? (
              <HelperText Variant="error">
                {form.formState.errors.passphrase.message as string}
              </HelperText>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Label>Confirm Passphrase</Label>
            <Input
              type="password"
              {...form.register("passphraseConfirm")}
              autoComplete="new-password"
              disabled={isSubmitting}
            />
            {form.formState?.errors?.passphraseConfirm?.message ? (
              <HelperText Variant="error">
                {form.formState.errors.passphraseConfirm.message as string}
              </HelperText>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Checkbox
              {...form.register("termsAndConditions")}
              disabled={isSubmitting}
            >
              I agree to the Terms & Conditions
            </Checkbox>
            {form.formState?.errors?.termsAndConditions?.message ? (
              <div>
                <HelperText Variant="error">
                  {form.formState.errors.termsAndConditions.message as string}
                </HelperText>
              </div>
            ) : undefined}
          </FormGroup>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Dialog.Close asChild>
            <Button type="button" aria-label="Cancel" Variant="dark">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            Variant="brand"
            aria-label="Connect"
            disabled={isLoading || isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Connect"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
