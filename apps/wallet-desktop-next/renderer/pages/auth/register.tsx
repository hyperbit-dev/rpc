import {
  Button,
  Checkbox,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "@hyperbitui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { startRegistration } from "@simplewebauthn/browser";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  username: z.string().min(4),
  terms: z.literal<boolean>(true).optional(),
});

type Schema = z.infer<typeof schema>;

export default function RegisterPage() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  async function handleSubmit(values: Schema) {
    const options = await fetch("/api/auth/register/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: values.username,
        username: values.username,
      }),
    }).then((res) => res.json());

    try {
      const attResp = await startRegistration(options);

      await fetch("/api/auth/register/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attResp),
      });
    } catch (error) {
      // // Some basic error handling
      // if (error.name === 'InvalidStateError') {
      //   elemError.innerText = 'Error: Authenticator was probably already registered by user';
      // } else {
      //   elemError.innerText = error;
      // }
      console.log("error", error);
    }
  }

  const errors = form.formState.errors;

  return (
    <React.Fragment>
      <Head>
        <title>Hyperbit</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="flex flex-col w-full max-w-sm gap-4 p-6 mx-auto">
          <h1 className="text-2xl font-semibold">Create User</h1>
          <p>
            The account will be registered to this device through the devices'
            built-in authentication methods.
          </p>
          <Form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormGroup>
              <Label htmlFor="form-username">Username</Label>
              <Input
                id="form-username"
                invalid={!!errors.username?.message}
                type="username"
                {...form.register("username")}
              />
              {errors.username ? (
                <FormFeedback className="text-sm">
                  {errors.username.message}
                </FormFeedback>
              ) : undefined}
            </FormGroup>
            <FormGroup>
              <Checkbox
                id="form-terms"
                invalid={!!errors.terms?.message}
                {...form.register("terms")}
              >
                I have read and agree to the Terms of Use
              </Checkbox>
              {errors.terms ? (
                <FormFeedback className="text-sm">Required field</FormFeedback>
              ) : undefined}
            </FormGroup>
            <div className="flex flex-row gap-4 pt-4">
              <Link href="/">
                <Button
                  asChild
                  outline
                  variant="secondary"
                  className="flex-1 text-center"
                >
                  <a>Back</a>
                </Button>
              </Link>
              <Button variant="primary" className="flex-1 text-center">
                Next
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}
