import { Container } from "@/_components/Container";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="py-12">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </Container>
  );
}
