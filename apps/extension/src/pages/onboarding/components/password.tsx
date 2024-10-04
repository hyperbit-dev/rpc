import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "@hyperbitui/react";

// import { useAuth } from "~/components";
import { PasswordSchema } from "../utils/schemas";
import { FormProvider, useForm } from "react-hook-form";
import { Step } from "../types";

export function Password({ setStep }: { setStep: (step: Step) => void }) {
  // const auth = useAuth();

  const form = useForm({
    resolver: zodResolver(PasswordSchema),
  });

  function handleSubmit(values: PasswordSchema) {
    console.log("values", values);
    // auth.login(values.password);
    setStep("choices");
  }

  // if (auth.token) {
  //   setStep("choices");
  // }

  // if (auth.loading) {
  //   return null;
  // }

  return (
    <FormProvider {...form}>
      <form
        // @ts-expect-error TODO
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col flex-1"
      >
        <div className="flex flex-col justify-center flex-1 w-full max-w-md px-4 mx-auto">
          <FormGroup>
            <h2 className="text-lg">Create Password</h2>
            <p>
              Your password allows you to protect your wallets{" "}
              <b>local only to this extension</b>. This is different from your
              seed phrase. It cannot be recovered, but may be changed later.
            </p>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input {...form.register("password")} type="password" />
            {form.formState?.errors?.password?.message ? (
              <FormFeedback className="text-sm">
                {form.formState.errors.password.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input {...form.register("passwordConfirm")} type="password" />
            {form.formState?.errors?.passwordConfirm?.message ? (
              <FormFeedback className="text-sm">
                {form.formState.errors.passwordConfirm.message as string}
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup className="mt-2">
            <Checkbox {...form.register("terms")}>
              Click to agree to our terms of service,{" "}
              <a href="https://hyperbit.app/terms-of-service" target="_blank">
                Terms of Service
              </a>
              .
            </Checkbox>
            {form.formState?.errors?.terms?.message ? (
              <FormFeedback className="block text-sm">
                You must agree to the Terms of Service to create an account.
              </FormFeedback>
            ) : undefined}
          </FormGroup>
          <FormGroup>
            <Button type="submit" fullWidth>
              Continue
            </Button>
          </FormGroup>
        </div>
      </form>
    </FormProvider>
  );
}
