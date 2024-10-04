import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet } from "@hyperbitjs-private/wallet";
import { chains } from "@hyperbitjs/chains";
import { QueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { CreateWalletSchema } from "./schemas";
import { CreateWalletForm } from "~/components/CreateWalletForm";
import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Textarea,
} from "@hyperbitui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useCreateWalletMutation } from "~/services/api/wallets/mutations";

export function WalletsAddPage() {
  const navigate = useNavigate();
  const createWalletMutation = useCreateWalletMutation();

  const form = useForm({
    resolver: zodResolver(CreateWalletSchema),
    defaultValues: {
      type: "create",
      blockchain: "btc",
      network: "mainnet",
      mnemonic: "",
    },
  });

  const type = form.watch("type");

  async function handleSubmit({
    blockchain,
    network: networkName,
    label,
    passphrase,
  }: CreateWalletSchema) {
    try {
      const network = chains[blockchain][networkName];

      const wallet = new Wallet({
        label,
        passphrase,
        network,
        database: "hyperbit_ext",
      });
      await wallet.init();

      const submission = {
        externalId: wallet.id,
        chainId: network.id,
        label: wallet.label,
      };
      console.log("submission", submission);
      const response = await createWalletMutation.mutateAsync(submission);
      console.log("response", response);

      const queryClient = new QueryClient();
      await queryClient.invalidateQueries({ queryKey: ["wallets"] });
      await queryClient.invalidateQueries({ queryKey: ["db-wallets"] });
      form.reset();
      navigate("/account/wallets");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between p-2 pt-3 pb-3">
        <div>&nbsp;</div>
        <div className="font-medium text-md">Create Wallet</div>
        <button
          type="button"
          className="outline-brand-500 action:text-brand-500"
          onClick={() => navigate(-1)}
        >
          <XMarkIcon className="w-5" />
        </button>
      </div>
      <div className="flex-1 px-2 overflow-auto">
        <FormProvider {...form}>
          {/* @ts-expect-error TODO */}
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormGroup>
              <Label>Type</Label>
              <Input asChild>
                <select {...form.register("type")}>
                  <option value="create">Create Wallet</option>
                  <option value="import">Import Wallet</option>
                </select>
              </Input>
            </FormGroup>
            <CreateWalletForm />
            {type === "import" ? (
              <FormGroup>
                <Label>Seed Phrase (mnemonic)</Label>
                <Textarea id="wallet-phrase" {...form.register("mnemonic")} />
                {form.formState?.errors?.mnemonic?.message ? (
                  <FormFeedback>
                    {form.formState.errors.mnemonic.message as string}
                  </FormFeedback>
                ) : undefined}
              </FormGroup>
            ) : undefined}
            <FormGroup className="mt-6">
              <Button type="submit" fullWidth>
                Continue
              </Button>
            </FormGroup>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
