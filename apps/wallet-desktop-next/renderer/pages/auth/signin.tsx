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
import { startAuthentication } from "@simplewebauthn/browser";
import { withIronSessionSsr } from "iron-session/next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/router";
import { isLoggedIn } from "../../_lib/auth";
import { sessionOptions } from "../../_lib/session";

const schema = z.object({
  username: z.string().min(4),
});

type Schema = z.infer<typeof schema>;

export default function SignInPage() {
  const router = useRouter();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  async function handleSubmit(values: Schema) {
    try {
      const options = await fetch("/api/auth/signin/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
        }),
      }).then((res) => res.json());

      const attResp = await startAuthentication(options);

      await fetch("/api/auth/signin/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attResp),
      });

      router.push("/admin");
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
          <h1 className="text-2xl font-semibold">Welcome Back!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor
            consequat id porta nibh.
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
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  if (isLoggedIn(req)) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  return { props: {} };
}, sessionOptions);
