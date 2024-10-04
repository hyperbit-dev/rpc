import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string({
    required_error: "Password is required",
  }),
});

export type LoginFormSchema = z.infer<typeof LoginFormSchema>;
