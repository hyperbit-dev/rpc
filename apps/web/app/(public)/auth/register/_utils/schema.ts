import { z } from "zod";

export const RegisterFormSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string({
    required_error: "Password is required",
  }),
  passwordConfirmation: z.string({
    required_error: "Password confirmation is required",
  }),
});

export type RegisterFormSchema = z.infer<typeof RegisterFormSchema>;
