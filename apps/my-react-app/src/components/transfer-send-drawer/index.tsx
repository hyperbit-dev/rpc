import React from "react";
import { Drawer } from "../drawer";
import { NexusWallet } from "~/utils/queries/wallets/types";
import { Button } from "../button";
import { FormProvider, useForm } from "react-hook-form";
import { SendSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepForm } from "./components/step-form";
import { StepPreview } from "./components/step-preview";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { DialogClose } from "@radix-ui/react-dialog";

type TransferSendDrawerProps = {
  Trigger: React.ReactNode;
  wallet: NexusWallet;
};

export function TransferSendDrawer({
  Trigger,
  wallet,
}: TransferSendDrawerProps) {
  const [step, setStep] = React.useState<"form" | "preview">("form");
  const form = useForm<SendSchema>({
    resolver: zodResolver(SendSchema),
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  function handleSubmit(values: SendSchema) {
    if (step === "preview") {
    } else {
      setStep("preview");
    }
  }

  const title =
    step === "preview"
      ? "Confirm Withdrawal"
      : `Transfer ${wallet.blockchain.name}`;

  return (
    <Drawer
      Title={title}
      Trigger={Trigger}
      Content={
        <FormProvider {...form}>
          {step === "preview" ? (
            <StepPreview wallet={wallet} />
          ) : (
            <StepForm wallet={wallet} handleSubmit={handleSubmit} />
          )}
        </FormProvider>
      }
      Footer={
        <>
          {step === "preview" ? (
            <Button
              type="button"
              Variant="dark"
              onClick={() => setStep("form")}
            >
              Back
            </Button>
          ) : (
            <DialogClose>
              <Button type="button" Variant="dark">
                Cancel
              </Button>
            </DialogClose>
          )}
          <Button
            type="submit"
            Variant="brand"
            onClick={form.handleSubmit(handleSubmit)}
          >
            {step === "preview" ? (
              <span className="flex items-center gap-2">
                Send <ArrowTopRightIcon />
              </span>
            ) : (
              "Preview"
            )}
          </Button>
        </>
      }
    />
  );
}
