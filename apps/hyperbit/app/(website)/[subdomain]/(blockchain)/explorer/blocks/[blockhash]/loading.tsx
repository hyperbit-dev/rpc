import { Container, PageHeader, SectionHeader } from "@/components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <Container>
      <PageHeader>Block</PageHeader>
      <Skeleton count={7} height={33} />
      <SectionHeader className="mt-4">Transactions</SectionHeader>
      <Skeleton count={5} height={33} />
    </Container>
  );
}
