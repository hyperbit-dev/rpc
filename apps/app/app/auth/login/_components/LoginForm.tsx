"use client";

import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Alert, FormFeedback } from "@hyperbit-private/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/lib/queries/auth";
import { FormGroup, Input, Label } from "@/components/forms";
import { LoginFormSchema } from "../schema";
import { Button } from "@/components/base";
import Image from "next/image";

export function LoginForm() {
  const router = useRouter();
  const [apiError, setApiErrors] = useState<{ message: string } | undefined>(
    undefined
  );
  const authLoginMutation = useLoginMutation();
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  async function handleSubmit(values: LoginFormSchema) {
    setApiErrors(undefined);
    try {
      await authLoginMutation.mutateAsync(values);
      router.push("/account");
    } catch (error) {
      setApiErrors(error as { message: string });
    }
  }

  const errors = form.formState.errors;

  return (
    <Container className="max-w-sm">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex items-center gap-2 mb-12">
          <Image src="/logo.svg" width={40} height={40} alt="Hyperbit Logo" />
          <div className="flex flex-col gap-1">
            <div className="font-medium text-xl leading-none">Hyperbit</div>
            <div className="font-normal text-sm text-gray-500 leading-none">
              Altcoin Central
            </div>
          </div>
        </div>
        <FormGroup className="mb-6">
          <PageHeader>Log in</PageHeader>
          <div className="leading-none">
            Welcome back! Please enter your credentials.
          </div>
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
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
            Width="full"
            className="mb-4"
          >
            Sign in
          </Button>
          <div className="relative before:absolute before:left-0 before:right-0 before:top-1/2 before:-z-1 before:h-1 before:content-[''] before:border-t before:border-gray-300 flex items-center justify-center mb-4">
            <span className="bg-white text-center text-sm text-gray-500 relative px-1">
              or
            </span>
          </div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            Variant="secondary"
            Width="full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Sign in with Google
          </Button>
        </FormGroup>
        <FormGroup className="flex justify-between text-sm">
          <Link href="/auth/register">Register</Link>
          <Link href="/auth/forgot-password">Forgot Password</Link>
        </FormGroup>
      </form>
    </Container>
  );
}
