"use client";
import * as RadixDialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@hyperbitui/react";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import { Dialog } from "../Dialog";
import { CreateWalletSchema } from "./schema";

const CreateWalletForm = dynamic(() => import("./CreateWalletForm"));

export function CreateWalletDialog() {
  const form = useForm({
    resolver: zodResolver(CreateWalletSchema),
    defaultValues: {
      step: "create",
      network: "mainnet",
    },
  });

  return (
    <Dialog
      MaxHeight="675px"
      Title="Create Wallet"
      Trigger={
        <Button
          size="sm"
          className="flex items-center gap-1"
          variant="secondary"
          outline
        >
          Create
        </Button>
      }
    >
      <FormProvider {...form}>
        <CreateWalletForm />
      </FormProvider>
    </Dialog>
  );
}
