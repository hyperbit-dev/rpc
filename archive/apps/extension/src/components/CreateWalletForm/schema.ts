import * as z from "zod";

export const WalletSchema = z.object({
  blockchain: z
    .string({ required_error: "Blockchain is required" })
    .min(1, { message: "Blockchain is required" }),
  network: z
    .string({ required_error: "Network is required" })
    .min(1, { message: "Network is required" }),
  label: z
    .string({ required_error: "Label is required" })
    .min(1, { message: "Label is required" }),
  passphrase: z
    .string({ required_error: "Passphrase is required" })
    // .min(1, { message: "Passphrase is required" })
    .optional(),
  passphraseConfirm: z
    .string({ required_error: "Passphrase confirmation is required" })
    // .min(1, { message: "Passphrase confirmation is required" })
    .optional(),
});

export type WalletSchema = z.infer<typeof WalletSchema>;

const StepsSchema = z.object({
  step: z.string(),
});

type StepsSchema = z.infer<typeof StepsSchema>;

export const CreateWalletSchema = StepsSchema.merge(WalletSchema).refine(
  (data) => data?.passphrase === data?.passphraseConfirm,
  {
    message: "Passphrase does not match",
    path: ["passphraseConfirm"],
  },
);

export type CreateWalletSchema = z.infer<typeof CreateWalletSchema>;
