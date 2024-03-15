import { zodResolver } from "@hookform/resolvers/zod";
import { chains } from "@hyperbitjs/chains";
import { Button } from "@hyperbitui/react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../Drawer";
import { Wallet } from "@hyperbitjs-private/wallet";
import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateWalletMutation } from "@/_api/client";
import { ImportWalletForm } from "../ImportWalletForm";
import { ImportWalletSchema } from "../ImportWalletForm/schema";
import { Spinner } from "../Spinner";

export function ImportWalletDrawer({ OnClose }: { OnClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(ImportWalletSchema),
    defaultValues: {
      blockchain: "btc",
      network: "mainnet",
    },
  });

  // const createWalletMutation = useCreateWalletMutation();

  async function handleSubmit({
    blockchain,
    network: networkName,
    label,
    passphrase,
    mnemonic,
  }: ImportWalletSchema) {
    try {
      const network = chains[blockchain][networkName];

      const wallet = new Wallet({
        label,
        mnemonic,
        network,
        passphrase,
        database: "hyperbit",
        type: "import",
      });
      await wallet.init();
      const queryClient = new QueryClient();
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      form.reset();
      setOpen(false);
      OnClose?.();
    } catch (error) {
      console.log("error", error);
    }

    // try {
    //   await createWalletMutation.mutateAsync({
    //     externalId: data.id,
    //     label: data.label,
    //     chainId: network.id,
    //     accounts: data.accounts,
    //   });
    //   form.reset();
    // } catch (err) {
    //   console.log("err", err);
    // }
  }

  return (
    <FormProvider {...form}>
      <Drawer
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <DrawerTrigger asChild>
          <Button type="button" size="sm" variant="secondary" outline>
            Import
          </Button>
        </DrawerTrigger>
        <DrawerContent
          open={open}
          Title={
            <DrawerHeader>
              <DrawerTitle>Import Wallet</DrawerTitle>
              <DrawerDescription>Import Wallet</DrawerDescription>
            </DrawerHeader>
          }
          Footer={
            <Button
              size="sm"
              type="submit"
              fullWidth
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Spinner /> : "Import Wallet"}
            </Button>
          }
          FormProps={{
            // @ts-ignore
            onSubmit: form.handleSubmit(handleSubmit),
          }}
        >
          <ImportWalletForm />
        </DrawerContent>
      </Drawer>
    </FormProvider>
  );
}
