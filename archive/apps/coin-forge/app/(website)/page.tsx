"use client";
import { Button } from "@hyperbit-private/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-24 text-center">
      <h1 className="text-3xl font-medium">Coin Forge - Web Wallet</h1>
      <div className="flex flex-col items-stretch w-full max-w-xs gap-4 sm:flex-row">
        <Button type="button" asChild fullWidth className="flex-1">
          <Link href="/auth/register">Register</Link>
        </Button>
        <Button
          type="button"
          variant="link"
          asChild
          fullWidth
          className="flex-1"
        >
          <Link href="/api/auth/signin">Login</Link>
        </Button>
      </div>
    </main>
  );
}
