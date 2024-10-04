"use client";

import { Container } from "@/_components/Container";
import { PageHeader } from "@/_components/PageHeader";
import {
  Alert,
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "@hyperbitui/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "./_utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthLoginMutation } from "@/_api/client/auth/use-login";
import { useRouter } from "next/navigation";

export default function AuthLoginPage() {
  const router = useRouter();
  const [apiError, setApiErrors] = useState<{ message: string } | undefined>(
    undefined
  );
  const authLoginMutation = useAuthLoginMutation();
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  async function handleSubmit(values: LoginFormSchema) {
    setApiErrors(undefined);
    try {
      await authLoginMutation.mutateAsync(values);
      router.push("/account/wallets");
    } catch (error) {
      setApiErrors(error as { message: string });
    }
  }

  const errors = form.formState.errors;

  return (
    <Container className="max-w-lg my-20">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormGroup>
          <PageHeader>Login</PageHeader>
        </FormGroup>
        {apiError?.message ? (
          <FormGroup>
            <Alert variant="danger">{apiError.message}</Alert>
          </FormGroup>
        ) : undefined}
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            disabled={form.formState.isSubmitting}
            {...form.register("email")}
          />
          {!!errors.email?.message ? (
            <FormFeedback>{errors.email.message}</FormFeedback>
          ) : undefined}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            disabled={form.formState.isSubmitting}
            {...form.register("password")}
          />
          {!!errors.password?.message ? (
            <FormFeedback>{errors.password.message}</FormFeedback>
          ) : undefined}
        </FormGroup>
        <FormGroup className="mt-8">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            fullWidth
          >
            Login
          </Button>
        </FormGroup>
        <FormGroup className="flex justify-between">
          <Link href="/auth/register">Register</Link>
          <Link href="/auth/forgot-password">Forgot Password</Link>
        </FormGroup>
      </form>
    </Container>
  );
}
