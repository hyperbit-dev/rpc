import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "~/components/container";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { HelperText } from "~/components/helper-text";
import { Button } from "~/components/button";
import { FormGroup } from "~/components/form-group";
import { Alert } from "~/components/alert";
import { useLoginMutation } from "~/utils/queries/auth";
import { LoginFormSchema } from "./schema";
import { Spinner } from "~/components/spinner";

export function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  const authLoginMutation = useLoginMutation();

  async function handleSubmit(values: LoginFormSchema) {
    setError(undefined);
    try {
      await authLoginMutation.mutateAsync(values);
      navigate({ to: "/account" });
    } catch (error) {
      setError((error as Error).message);
    }
  }

  const errors = form.formState.errors;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Container Size="sm">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-4">
          {!!error ? <Alert Variant="danger">{error}</Alert> : undefined}
          <FormGroup>
            <Label htmlFor="form-email">Email</Label>
            <Input
              {...form.register("email")}
              id="form-email"
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
            {!!errors.email?.message ? (
              <HelperText Variant="error">{errors.email.message}</HelperText>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="form-password">Password</Label>
            <Input
              {...form.register("password")}
              id="form-password"
              type="password"
              disabled={isSubmitting}
            />
            {!!errors.password?.message ? (
              <HelperText Variant="error">{errors.password.message}</HelperText>
            ) : undefined}
          </FormGroup>
          <FormGroup className="mt-4">
            <Button
              type="submit"
              Variant="dark"
              Width="full"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Sign in"}
            </Button>
          </FormGroup>
          <FormGroup Justify="row" className="text-sm">
            <Link href="/auth/register">Register</Link>
            <Link href="/auth/forgot-password">Forgot Password</Link>
          </FormGroup>
        </div>
      </form>
    </Container>
  );
}
