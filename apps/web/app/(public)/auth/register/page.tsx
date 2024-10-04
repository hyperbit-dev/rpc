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
import { RegisterFormSchema } from "./_utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthRegisterMutation } from "@/_api/client/auth/use-register";
import { useRouter } from "next/navigation";

export default function AuthRegisterPage() {
  const router = useRouter();
  const [apiError, setApiErrors] = useState<{ message: string } | undefined>(
    undefined
  );
  const authRegisterMutation = useAuthRegisterMutation();
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(RegisterFormSchema),
  });

  async function handleSubmit(values: RegisterFormSchema) {
    setApiErrors(undefined);
    try {
      await authRegisterMutation.mutateAsync(values);
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
          <PageHeader>Register</PageHeader>
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
        <FormGroup>
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>
          <Input
            id="passwordConfirmation"
            type="password"
            disabled={form.formState.isSubmitting}
            {...form.register("passwordConfirmation")}
          />
          {!!errors.passwordConfirmation?.message ? (
            <FormFeedback>{errors.passwordConfirmation.message}</FormFeedback>
          ) : undefined}
        </FormGroup>
        <FormGroup className="mt-8">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            fullWidth
          >
            Register
          </Button>
        </FormGroup>
        <FormGroup className="flex justify-between">
          <Link href="/auth/login">Sign in</Link>
          <Link href="/auth/forgot-password">Forgot Password</Link>
        </FormGroup>
      </form>
    </Container>
  );
}
