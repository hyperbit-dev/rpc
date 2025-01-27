import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "~/components/page-header";

export const Route = createFileRoute("/account/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PageHeader Title="Dashboard" />
    </>
  );
}
