import { Checkbox, Button, Input } from "@slipstreamui/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ButtonLink, FormGroup, FormError } from "~/components";

const formSchema = z.object({
  password: z.string({ required_error: "Password is required" }).min(1),
  passwordConfirm: z.string().min(1),
  terms: z.literal(true),
});

type FormSchema = z.infer<typeof formSchema>;

export function StepPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>();

  async function onSubmit(values: FormSchema) {
    console.log("values", values);
  }

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
      <div className="flex-1">
        <p className="mb-4">
          This password is used to protect your wallets and provide access to
          the browser extension. It cannot be reset and is separate from all
          other wallets.
        </p>
        <FormGroup>
          <label htmlFor="form-password">Password</label>
          <Input
            id="form-password"
            type="password"
            variant="bordered"
            {...register("password", { required: true })}
          />
          {errors.password ? (
            <FormError>{errors.password.message}</FormError>
          ) : undefined}
        </FormGroup>
        <FormGroup>
          <label htmlFor="form-confirm-password">Confirm Password</label>
          <Input
            id="form-confirm-password"
            type="password"
            variant="bordered"
            {...register("passwordConfirm", { required: true })}
          />
          {errors.passwordConfirm ? (
            <FormError>{errors.passwordConfirm.message}</FormError>
          ) : undefined}
        </FormGroup>
        <FormGroup>
          <Checkbox {...register("terms", { required: true })}>
            I have read and agree to the Terms of Use.
          </Checkbox>
          {errors.terms ? (
            <FormError>{errors.terms.message}</FormError>
          ) : undefined}
        </FormGroup>
      </div>
      <div className="flex items-center gap-4 py-4 justify-even">
        <ButtonLink href="/" color="secondary" fullWidth>
          Back
        </ButtonLink>
        <Button type="submit" color="brand" fullWidth>
          Next
        </Button>
      </div>
    </form>
  );
}
