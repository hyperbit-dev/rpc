import { z } from "zod";

export const LoginSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email({ message: "Invalid email" }),
    password: z.string().min(1, "Password is required"),
    passwordConfirmation: z
      .string()
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password must match",
    path: ["passwordConfirmation"],
  });

export type LoginSchema = z.infer<typeof LoginSchema>;
