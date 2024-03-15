"use client";
// import { SessionProvider } from "next-auth/react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PouchDB from "pouchdb-browser";
import React, { useState } from "react";
import { Provider as PouchProvider } from "use-pouchdb";

const db = new PouchDB("hyperbit");

function Provider({ children }: any) {
  const [client] = useState(new QueryClient());

  return (
    <>
      {/* <SessionProvider refetchOnWindowFocus={false}> */}
      <PouchProvider pouchdb={db}>
        <QueryClientProvider client={client}>
          <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PouchProvider>
      {/* </SessionProvider> */}
    </>
  );
}

export { Provider };
