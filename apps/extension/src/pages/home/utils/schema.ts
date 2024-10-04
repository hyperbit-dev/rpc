import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email({ message: "Invalid email" }),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
