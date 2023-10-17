"use client";

import Image from "next/image";
import React from "react";
import { ButtonLink, Center, Container } from "../components";

export default function Home() {
  return (
    <Center className="flex-1">
      <Container className="flex flex-col items-center justify-center max-w-xs gap-3 text-center select-none">
        <Image src="/logo.svg" alt="Hyperbit Logo" width="100" height="100" />
        <h1 className="mb-4 text-2xl font-medium font-brand dark:text-white">
          Hyperbit
        </h1>
        <ButtonLink
          href="/auth/create"
          hrefAs="/auth/create.html"
          color="brand"
          fullWidth
        >
          Create Wallet
        </ButtonLink>
        <ButtonLink
          href="/auth/import"
          hrefAs="/auth/import.html"
          color="secondary"
          fullWidth
        >
          Import Wallet
        </ButtonLink>
      </Container>
    </Center>
  );
}
