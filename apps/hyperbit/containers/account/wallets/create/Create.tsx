"use client";
import { Container, PageHeader, SectionCard } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { WalletSchema } from "./schema";
import { CreateMnemonic } from "./components/CreateMnemonic";
import { Wallet } from "@/services/wallet";
import { Summary } from "./components/Summary";

export function CreateWallet() {
  const [wallet, setWallet] = useState<Wallet>();
  const form = useForm({
    resolver: zodResolver(WalletSchema),
    defaultValues: {
      step: "create",
    },
  });

  const step = form.watch("step");

  function renderStep() {
    switch (step) {
      case "summary":
        return <Summary wallet={wallet} />;
      default:
        return <CreateMnemonic setWallet={setWallet} />;
    }
  }

  return (
    <Container className="flex flex-col max-w-xl gap-4 mt-8">
      <PageHeader>Create Non-custodial Wallet</PageHeader>
      <FormProvider {...form}>{renderStep()}</FormProvider>
    </Container>
  );
}
