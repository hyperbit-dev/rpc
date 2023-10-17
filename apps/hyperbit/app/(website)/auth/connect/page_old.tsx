"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { chains } from "@hyperbitjs/chains";
import React, { useEffect, useMemo } from "react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormRow, Select } from "@/components";
import { Form, FormGroup, Textarea } from "@hyperbitui/react";
import { useRouter } from "next/navigation";

const schema = z.object({
  blockchain: z.string().min(1),
  publicKey: z.string().min(1),
  signature: z.string().min(1),
});

export default function Connect() {
  const [nonce, setNonce] = useState<string | null>(null);
  const router = useRouter();
  const { status } = useSession();
  const form = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
    fetchNonce().then((nonce) => setNonce(nonce));
  }, [router, status, setNonce]);

  const options = useMemo(() => {
    const options = Object.keys(chains)
      .map((chain: any) => {
        const name: string = (chains as any)[chain].mainnet.name;
        return {
          label: name.match(/[A-Z][a-z]+/g)?.join(" ") ?? name,
          value: chain,
          networks: (chains as any)[chain],
        };
      })
      .filter((chain) => !!chain.networks.mainnet.messagePrefix);
    return options;
  }, []);

  async function fetchNonce() {
    const response = await fetch("/api/auth/siwm");

    if (response.status !== 200)
      throw new Error("nonce could not be retrieved");

    const { nonce } = await response.json();

    return nonce;
  }

  async function handleSubmit(values) {
    console.log("values", values);

    // const nonce = await fetchNonce();

    // const message = `Sign this message for authenticating with your wallet. Nonce: ${nonce}`;
    // const encodedMessage = new TextEncoder().encode(message);
    // // make request to third party
    // const signedMessage = await solana.request({
    //   method: "signMessage",
    //   params: {
    //     message: encodedMessage,
    //   },
    // });

    try {
      // // sign in with third party information
      await signIn("siwm", {
        redirect: false,
        blockchain: values.blockchain,
        publicKey: values.publicKey,
        signature: values.signature,
      });
    } catch (e) {
      console.log("e", e);
    }
  }

  if (status === "loading") {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center flex-1 bg-slate-800">
      <div className="absolute top-0 left-0 z-20 w-1/2 h-full overflow-hidden bg-gradient-to-r from-brand-500 to-brand-600"></div>
      <div className="relative z-30 w-full max-w-md mx-8 my-20">
        <div
          className="absolute z-10 w-64 h-64 -mb-1p -bottom-14 -left-14"
          style={{
            backgroundImage: "radial-gradient(#f0f4ff 25%, transparent 25%)",
            backgroundSize: "25px 25px",
          }}
        ></div>
        <div
          className="absolute z-10 w-64 h-64 -mr-1 -top-14 -right-14"
          style={{
            backgroundImage: "radial-gradient(#3e4e69 25%, transparent 25%)",
            backgroundSize: "25px 25px",
          }}
        ></div>
        <div className="relative z-20 px-8 pt-4 pb-8 text-white bg-slate-700 rounded-xl drop-shadow-xl">
          <h1 className="mb-6 text-2xl font-semibold text-center">Connect</h1>
          <hr className="mb-4 -mx-8 -mt-2 border-slate-500" />
          <Form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormRow id="login-nonce" Label="Sign the following message:">
              <Textarea
                type="text"
                defaultValue={nonce}
                className="w-full text-white bg-slate-800 border-slate-800"
              />
            </FormRow>
            <FormGroup className="flex flex-col gap-2">
              <label>Blockchain</label>
              <Select
                {...form.register("blockchain")}
                className="text-white bg-slate-800 border-slate-800"
              >
                {options.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup className="flex flex-col gap-2">
              <label>Public Key</label>
              <Textarea
                {...form.register("publicKey")}
                className="text-white bg-slate-800 border-slate-800"
              />
            </FormGroup>
            <FormGroup className="flex flex-col gap-2">
              <label>Signature</label>
              <Textarea
                rows={4}
                {...form.register("signature")}
                className="text-white bg-slate-800 border-slate-800"
              />
            </FormGroup>
            <hr className="my-6 -mx-8 border-slate-500" />
            <button
              type="submit"
              className="w-full p-2 font-medium text-white border rounded-lg border-brand-600 bg-gradient-to-r from-brand-600 to-brand-600"
            >
              Login
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
