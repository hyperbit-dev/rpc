import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "@hyperbit-private/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useAuth } from "~/hooks";
import { LoginSchema } from "./utils/schema";

export function RegisterPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    if (auth.user) {
      navigate("/account");
    }
  }, [auth.user, navigate]);

  async function handleSubmit({
    email,
    password,
    passwordConfirmation,
  }: LoginSchema) {
    setError(null);
    try {
      await auth.register({
        email,
        password,
        passwordConfirmation,
      });
    } catch (error) {
      setError((error as Error).message);
    }
  }

  const errors = form.formState.errors;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit as SubmitHandler<FieldValues>)}
        className="flex flex-col flex-1"
      >
        <div
          className="flex flex-col justify-center flex-1 w-full mx-auto"
          style={{ maxWidth: "250px" }}
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-800">Register</h1>
          </div>
          {error && (
            <FormGroup>
              <Alert variant="danger">{error}</Alert>
            </FormGroup>
          )}
          <FormGroup>
            <Label htmlFor="form-email">Email</Label>
            <Input {...form.register("email")} type="email" id="form-email" />
            {errors.email && (
              <FormFeedback>{errors.email.message?.toString()}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="form-password">Password</Label>
            <Input
              {...form.register("password")}
              type="password"
              id="form-password"
            />
            {errors.password && (
              <FormFeedback>{errors.password.message?.toString()}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="form-passwordConfirmation">Confirm Password</Label>
            <Input
              {...form.register("passwordConfirmation")}
              type="password"
              id="form-passwordConfirmation"
            />
            {errors.passwordConfirmation && (
              <FormFeedback>
                {errors.passwordConfirmation.message?.toString()}
              </FormFeedback>
            )}
          </FormGroup>
          <Button type="submit" fullWidth={true}>
            Register
          </Button>
          <Link
            to="/"
            className="block mt-2 text-sm text-center text-brand-500 action:text-brand-700"
          >
            ← Back
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
