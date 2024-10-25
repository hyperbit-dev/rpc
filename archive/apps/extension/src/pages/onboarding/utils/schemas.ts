import * as z from "zod";

export const PasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Password is required" }),
    passwordConfirm: z
      .string({ required_error: "Password confirmation is required" })
      .min(1, { message: "Password confirmation is required" }),
    terms: z.literal(true),
  })
  .refine((data) => data?.password === data?.passwordConfirm, {
    message: "Passpword does not match",
    path: ["passwordConfirm"],
  });

export type PasswordSchema = z.infer<typeof PasswordSchema>;
