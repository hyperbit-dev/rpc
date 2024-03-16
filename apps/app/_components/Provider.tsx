"use client";
// import { SessionProvider } from "next-auth/react";
// import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";

function Provider({ children }: any) {
  const [client] = useState(new QueryClient());

  return (
    <>
      {/* <SessionProvider refetchOnWindowFocus={false}> */}
      <QueryClientProvider client={client}>
        {/* <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration> */}
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      {/* </SessionProvider> */}
    </>
  );
}

export { Provider };
