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
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h4 className="mb-2 text-lg font-medium text-white">Products</h4>
            <ul className="text-sm leading-loose">
              <li>
                <Link href="/explorers">Block Explorers</Link>
              </li>
              <li>
                <Link href="/faucet">Faucet</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-lg font-medium text-white">Developers</h4>
            <ul className="text-sm leading-loose">
              <li>
                <Link href="/resources">Resources</Link>
              </li>
            </ul>
          </div>
        </section>
        <section className="py-12 flex items-center gap-4">
          <h4 className="text-lg font-medium text-white">Community</h4>
          <a href="https://x.com/hyperbitapp" target="_blank" className="group">
            <svg
              className="outline-none fill-white group-hover:fill-brand-500 group-focus:fill-brand-500 group-active:fill-brand-500"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 487.43 456.19"
            >
              <path
                d="M7.48,21.9,195.66,273.57,6.29,478.1H48.91L214.71,299l134,179.11h145L294.93,212.33,471.2,21.9H428.58L275.89,186.82,152.51,21.9ZM70.16,53.3h66.63L431,446.7H364.39Z"
                transform="translate(-6.29 -21.9)"
              />
            </svg>
          </a>
          <a
            href="https://github.com/hyperbit-dev"
            target="_blank"
            className="group"
          >
            <svg
              className="outline-none fill-white group-hover:fill-brand-500 group-focus:fill-brand-500 group-active:fill-brand-500"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              version="1.1"
            >
              <g stroke="none" strokeWidth="1" fillRule="evenodd">
                <g transform="translate(-140.000000, -7559.000000)">
                  <g transform="translate(56.000000, 160.000000)">
                    <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"></path>
                  </g>
                </g>
              </g>
            </svg>
          </a>
        </section>
      </Container>
    </footer>
  );
}
