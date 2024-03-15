import * as z from "zod";

export const CreateWalletSchema = z
  .object({
    step: z.string(),
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
      .min(1, { message: "Passphrase is required" }),
    passphraseConfirm: z
      .string({ required_error: "Passphrase confirmation is required" })
      .min(1, { message: "Passphrase confirmation is required" }),
    termsAndConditions: z
      .boolean({ required_error: "Required" })
      .refine((x) => !!x, { message: "Required" }),
  })
  .refine((data) => data?.passphrase === data?.passphraseConfirm, {
    message: "Passphrase does not match",
    path: ["passphraseConfirm"],
  });

export type CreateWalletSchema = z.infer<typeof CreateWalletSchema>;
