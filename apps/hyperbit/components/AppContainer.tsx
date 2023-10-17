import { ReactNode } from "react";
import { Container } from "./Container";

type AppContainerProps = {
  children?: ReactNode;
};

export function AppContainer({ children }: AppContainerProps) {
  return <Container className="py-6">{children}</Container>;
}
