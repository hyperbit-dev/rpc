"use client";

import React, { useState } from "react";
import { Heading, Layout } from "~/components";
import { StepPassword } from "./components/StepPassword";

export default function Register() {
  const [step, setStep] = useState("password");

  function renderStep() {
    switch (step) {
      default:
        return <StepPassword />;
    }
  }

  return (
    <Layout>
      <Heading>Create Wallet</Heading>
      {renderStep()}
    </Layout>
  );
}
