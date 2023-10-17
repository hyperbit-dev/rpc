import type { NextPage } from "next";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Card } from "ui";

export default function Home() {
  return (
    <main>
      <section>
        <h1>Hello!</h1>
        <p>This is a Next.js application. 😎</p>
      </section>
      <Card title="asdf" href="asdf">
        asdf
      </Card>
      <Button color="primary" size="sm">
        asdf
      </Button>
      <Link href="/test" as="/test.html">
        Test
      </Link>
    </main>
  );
}
