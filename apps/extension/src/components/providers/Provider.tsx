import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PouchDB from "pouchdb-browser";
import React, { useState } from "react";
import { Provider as PouchProvider } from "use-pouchdb";
import { AuthProvider } from "~/hooks";

const db = new PouchDB("hyperbit_ext");

export function Provider({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <>
      <PouchProvider pouchdb={db}>
        <QueryClientProvider client={client}>
          <AuthProvider>
            <ReactQueryStreamedHydration>
              {children}
            </ReactQueryStreamedHydration>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </AuthProvider>
        </QueryClientProvider>
      </PouchProvider>
    </>
  );
}
