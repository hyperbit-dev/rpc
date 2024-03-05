"use client";
import * as RadixDialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@hyperbitui/react";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import { Dialog } from "../Dialog";
import { ImportWalletSchema } from "./schema";

const ImportWalletForm = dynamic(() => import("./ImportWalletForm"));

export function ImportWalletDialog() {
  const form = useForm({
    resolver: zodResolver(ImportWalletSchema),
    defaultValues: {
      step: "create",
      network: "mainnet",
    },
  });

  return (
    <Dialog
      MaxHeight="675px"
      Title="Import Wallet"
      Trigger={
        <Button
          size="sm"
          className="flex items-center gap-1"
          variant="secondary"
          outline
        >
          Import
        </Button>
      }
    >
      <FormProvider {...form}>
        <ImportWalletForm />
      </FormProvider>
    </Dialog>
  );
}
