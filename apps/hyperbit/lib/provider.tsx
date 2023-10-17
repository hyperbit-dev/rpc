"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
