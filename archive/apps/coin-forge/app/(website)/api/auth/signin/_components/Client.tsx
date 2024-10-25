"use client";

import { Button } from "@hyperbit-private/react";
import { signIn } from "next-auth/react";

export function SignIn({ providers }: { providers: any }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-24 text-center">
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <Button
            type="button"
            outline
            variant="primary"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </main>
  );
}
