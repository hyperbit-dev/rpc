import { z } from "zod";
import { WalletSchema } from "~/components/CreateWalletForm";

export const CreateWalletSchema = WalletSchema.merge(
  z.object({
    type: z.string(), // create | import
    mnemonic: z
      .string({ required_error: "Seed phrase is required" })
      .min(1, { message: "Seed phrase is required" })
      .optional(),
  })
)
  .refine(
    (data) => data?.passphrase === data?.passphraseConfirm,
    {
      message: "Passphrase does not match",
      path: ["passphraseConfirm"],
    }
  )
  .refine((data) => data?.type === "import" && data.mnemonic, {
    message: "Seed Phrase is required",
    path: ["mnemonic"],
  });

export type CreateWalletSchema = z.infer<typeof CreateWalletSchema>;
