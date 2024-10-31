import { workSans } from "@/styles/fonts";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

export function NavFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      <Container>
        <section className="py-12 flex flex-col items-start gap-3">
          <Link href="/" className="flex items-center gap-2 select-none">
            <Image src="/logo-white.svg" alt="Logo" width="25" height="25" />
            <span
              className={clsx(
                "text-xl font-bold leading-none text-white",
                workSans.className
              )}
            >
              Hyperbit
            </span>
          </Link>
          <span>&copy; {currentYear} Hyperbit. All rights reserved.</span>
        </section>
      </Container>
      <section></section>
    </footer>
  );
}
