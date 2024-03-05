"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";

export function Providers({ children }: { children?: ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
