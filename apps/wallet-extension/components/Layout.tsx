import { ReactNode } from "react";
import { Center } from "./Center";
import { Container } from "./Container";

export function Layout({ children }: { children?: ReactNode }) {
  return (
    <Center className="flex-1 bg-white border border-gray-200 rounded" style={{ maxHeight: "600px" }}>
      <Container className="flex flex-col flex-1">{children}</Container>
    </Center>
  );
}
