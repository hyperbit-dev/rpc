import { Container } from "@/components";
import { ReactNode } from "react";

type FaucetContainerProps = {
  children: ReactNode;
};

export function FaucetContainer({ children }: FaucetContainerProps) {
  return (
    <Container className="flex flex-col justify-center max-w-xl my-16 text-center">
      {children}
    </Container>
  );
}
