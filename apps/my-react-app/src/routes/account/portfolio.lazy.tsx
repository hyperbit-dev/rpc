import { createLazyFileRoute } from "@tanstack/react-router";
import { PageHeader } from "~/components/page-header";

export const Route = createLazyFileRoute("/account/portfolio")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PageHeader Title="Portfolio" />
    </>
  );
}
