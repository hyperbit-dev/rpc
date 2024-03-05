import { Container } from "@/_components/Container";
import { Button } from "@hyperbitui/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(0deg, #7fd298 0%, #5fc77e 100%)",
        }}
      >
        <Container>
          <div className="max-w-3xl mx-auto my-12 text-center">
            <h1 className="mb-1 text-4xl font-bold text-white">
              Navigating Your Crypto Journey with Ease!
            </h1>
            <p className="text-lg text-white">
              Explore our user-friendly crypto resources to manage your assets
              effortlessly.
            </p>
            <div className="flex items-center justify-center max-w-xs gap-4 mx-auto mt-8">
              <Button variant="light" fullWidth asChild>
                <Link href="/explorers">Explorers</Link>
              </Button>
              <Button variant="light" fullWidth asChild>
                <Link href="/explorers">Faucet</Link>
              </Button>
            </div>
          </div>
          <div className="max-w-3xl mx-auto -mb-48 bg-white border border-8 border-gray-300 rounded-md">
            <Image
              src="/marketing/explorer-1.png"
              width={1200}
              height={600}
              alt="Banner Image"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
