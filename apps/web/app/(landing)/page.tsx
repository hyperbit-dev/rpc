import { Container } from "@/_components/Container";
import { Button } from "@hyperbitui/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(45deg, #5fc77e 20%, #5fc77e 20%, #63cd83 27%, #5fc77e 27%, #5fc77e 28%, #63cd83 28%, #69d389 35%, #5fc77e 35%, #5fc77e 36%, #69d389 36%, #6ad58a 43%, #5fc77e 43%, #5fc77e 44%, #6ad58a 44%, #6ad58a 51%, #5fc77e 51%)",
          marginTop: "-65px",
          paddingTop: "80px",
        }}
      >
        <Container>
          <div className="max-w-3xl mx-auto my-12 text-center">
            <h1 className="mb-1 text-4xl font-extrabold text-white">
              Navigating Your Crypto Journey with Ease!
            </h1>
            <p className="text-lg font-medium text-white">
              Explore our user-friendly crypto resources to manage your assets
              effortlessly.
            </p>
            <div className="flex items-center justify-center max-w-xs gap-4 mx-auto mt-8">
              <Button variant="light" fullWidth asChild>
                <Link href="/explorers">Explorers</Link>
              </Button>
              <Button variant="light" fullWidth asChild>
                <Link href="/faucet">Faucet</Link>
              </Button>
            </div>
          </div>
          <div className="max-w-3xl mx-auto -mb-24 bg-white border border-8 border-gray-300 rounded-md sm:-mg-36 md:-mb-48">
            <Image
              src="/marketing/explorer-1.png"
              width={1200}
              height={600}
              alt="Banner Image"
            />
          </div>
        </Container>
      </div>
      {/* <main className="flex flex-col flex-1 h-full overflow-auto"></main> */}
    </>
  );
}
