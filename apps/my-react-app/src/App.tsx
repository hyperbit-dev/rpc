import { RouterProvider, createRouter } from "@tanstack/react-router";
// Import the auto generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./hooks/use-auth";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

export default function App() {
  const auth = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  );
}
