import { Wallet } from "@hyperbitjs-private/wallet";
import { chains } from "@hyperbitjs/chains";
import { Button, FormGroup } from "@hyperbitui/react";
import { Step } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  ImportWalletForm,
  ImportWalletSchema,
} from "~/components/ImportWalletForm";
import { QueryClient } from "@tanstack/react-query";

export function ImportWallet({ setStep }: { setStep: (step: Step) => void }) {
  const form = useForm({
    resolver: zodResolver(ImportWalletSchema),
    defaultValues: {
      step: "create",
      blockchain: "btc",
      network: "mainnet",
    },
  });

  async function handleSubmit({
    blockchain,
    network: networkName,
    label,
    mnemonic,
    passphrase,
  }: ImportWalletSchema) {
    try {
      const network = chains[blockchain][networkName];

      const wallet = new Wallet({
        label,
        mnemonic,
        passphrase,
        network,
        database: "hyperbit_ext",
        type: "import",
      });
      await wallet.init();
      const queryClient = new QueryClient();
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      form.reset();
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="flex flex-col justify-center flex-1 w-full max-w-md px-4 mx-auto">
      <h2 className="mb-4 text-lg">Import Wallet</h2>
      <FormProvider {...form}>
        {/* @ts-expect-error TODO */}
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <ImportWalletForm />
          <FormGroup className="mt-6">
            <Button type="submit" fullWidth>
              Continue
            </Button>
          </FormGroup>
        </form>
      </FormProvider>
      <button type="button" onClick={() => setStep("choices")}>
        Back
      </button>
    </div>
  );
}
