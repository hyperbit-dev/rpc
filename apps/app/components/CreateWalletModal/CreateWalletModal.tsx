import { FormProvider, useForm } from "react-hook-form";
import { Modal, ModalButton, ModalWrapper } from "../modal";
import { CreateWalletSchema } from "./schema";
import { CreateWalletForm } from "./CreateWalletForm";

type CreateWalletModalProps = {
  ButtonText?: string;
};

export function CreateWalletModal({
  ButtonText = "Create",
}: CreateWalletModalProps) {
  const form = useForm<CreateWalletSchema>({
    defaultValues: {
      network: "mainnet",
    },
  });

  return (
    <ModalWrapper>
      <ModalButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        {ButtonText}
      </ModalButton>
      <FormProvider {...form}>
        <Modal Title="Create Asset">
          <CreateWalletForm />
        </Modal>
      </FormProvider>
    </ModalWrapper>
  );
}
