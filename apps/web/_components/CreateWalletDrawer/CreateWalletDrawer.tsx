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
import { CreateWalletForm } from "../CreateWalletForm";
import { CreateWalletSchema } from "../CreateWalletForm/schema";
import { Spinner } from "../Spinner";

export function CreateWalletDrawer({ OnClose }: { OnClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(CreateWalletSchema),
    defaultValues: {
      step: "create",
      blockchain: "btc",
      network: "mainnet",
    },
  });

  const createWalletMutation = useCreateWalletMutation();

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
        database: "hyperbit",
      });
      await wallet.init();
      const res = await createWalletMutation.mutateAsync({
        externalId: wallet.id,
        label: wallet.label,
        chainId: network.id,
      });
      console.log("res", res);
      form.reset();
      setOpen(false);
      OnClose?.();
    } catch (error) {
      console.log("error", error);
    }

    // try {
    //   await importWalletMutation.mutateAsync({
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
            Create
          </Button>
        </DrawerTrigger>
        <DrawerContent
          open={open}
          Title={
            <DrawerHeader>
              <DrawerTitle>Create Wallet</DrawerTitle>
              <DrawerDescription>Create Wallet</DrawerDescription>
            </DrawerHeader>
          }
          Footer={
            <Button
              size="sm"
              type="submit"
              fullWidth
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Spinner /> : "Create Wallet"}
            </Button>
          }
          FormProps={{
            // @ts-ignore
            onSubmit: form.handleSubmit(handleSubmit),
          }}
        >
          <CreateWalletForm />
        </DrawerContent>
      </Drawer>
    </FormProvider>
  );
}
