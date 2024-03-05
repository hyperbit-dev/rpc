import { Container } from "~/_components/Container";
import { PageHeader } from "~/_components/PageHeader";
import { SectionHeader } from "~/_components/SectionHeader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <Container>
      <PageHeader>Address</PageHeader>
      <Skeleton count={3} height={33} />
      <SectionHeader>Assets</SectionHeader>
      <Skeleton count={3} height={33} />
      <SectionHeader>Transactions</SectionHeader>
      <Skeleton count={1} height={33} />
      <SectionHeader>UTXOs</SectionHeader>
      <Skeleton count={3} height={33} />
    </Container>
  );
}
