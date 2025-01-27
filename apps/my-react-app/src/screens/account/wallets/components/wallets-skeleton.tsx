import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Container } from "~/components/container";

export function WalletsSkeleton() {
  return (
    <Container>
      <Skeleton count={6} height={40} />
    </Container>
  );
}
