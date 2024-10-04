import { Container } from "@/_components/Container";
import { SectionHeader } from "@/_components/SectionHeader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <Container>
      <div className="mb-6">
        <Skeleton count={1} height={33} />
      </div>
      <Skeleton count={6} height={33} />
      <section className="my-4">
        <SectionHeader>
          <Skeleton count={1} height={33} />
        </SectionHeader>
        <Skeleton count={2} height={33} />
      </section>
    </Container>
  );
}
