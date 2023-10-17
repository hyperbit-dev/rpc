"use client";
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { useSession } from "next-auth/react";
import { Container } from "./Container";

export default function Layout({
  children,
  params,
}: {
  children?: ReactNode;
  params: { subdomain: string };
}) {
  const { status } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <>
      <Navbar subdomain={params.subdomain} />
      <main className="relative z-10 flex flex-col flex-1 w-full h-full overflow-auto">
        {children}
        <footer className="flex flex-wrap py-8 text-gray-100 bg-gray-900">
          <Container className="flex flex-wrap">
            <div className="w-full sm:w-1/4">
              <a className="flex items-center gap-2" href="/">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    viewBox="0 0 460 460"
                  >
                    <defs>
                      <linearGradient id="logo_svg__logoGradient">
                        <stop
                          className="logo_svg__stop1"
                          offset="0%"
                          stopColor="#7fd298"
                        ></stop>
                        <stop offset="50%" stopColor="#5fc77e"></stop>
                        <stop offset="100%" stopColor="#39774c"></stop>
                      </linearGradient>
                      <style></style>
                    </defs>
                    <path
                      id="logo_svg__Selection"
                      fill="url('#logo_svg__logoGradient')"
                      stroke="#EDB40D"
                      strokeWidth="1"
                      d="M25 .15h152C197.98.03 209.97 12.02 210 33v144c-.03 21.55-12.83 32.97-34 33H34c-14.88-.02-27.33-6-32.25-21C.07 183.9.01 181.25 0 176V32C.19 15.75 8.96 4.04 25 .15Zm250 0h152C447.91.03 459.97 12.1 460 33v144c-.03 21.39-12.98 32.97-34 33H312c-26.1.04-54.12 9.74-72.96 28.09-5.52 5.37-10.5 12.29-14.44 18.91-8.91 14.99-14.57 38.57-14.6 56v116c-.24 20.41-14.64 30.97-34 31H32c-20.53-.25-31.97-14.17-32-34V284c.03-21.02 11.61-33.97 33-34h113c26.45-.04 53.1-8.63 73-26.29 4.94-4.39 10.32-11.17 14-16.71 5.09-7.68 8.98-16.16 11.58-25 3.2-10.92 5.4-22.6 5.42-34V34c.03-17.24 7.4-29.62 25-33.85Zm0 250h152c20.98-.12 32.97 11.87 33 32.85v144c-.03 21.41-12.95 32.97-34 33H284c-21.07-.03-33.97-12.93-34-34V282c.19-16.31 8.88-27.95 25-31.85Z"
                    ></path>
                  </svg>
                </span>
                <span className="uppercase">Hyperbit</span>
              </a>
            </div>
            <div className="w-full sm:w-1/4">
              <h5 className="mb-4 text-brand-500">Explorers</h5>
              <ul className="flex flex-col gap-2 mb-4 text-sm">
                <li>
                  <a href="/">Ravencoin (Testnet)</a>
                </li>
                <li>
                  <a href="/">Evrmore (Testnet)</a>
                </li>
              </ul>
              <h5 className="mb-4 text-brand-500">Faucets</h5>
              <ul className="flex flex-col gap-2 mb-4 text-sm">
                <li>
                  <a href="/">Ravencoin (Testnet)</a>
                </li>
                <li>
                  <a href="/">Evrmore (Testnet)</a>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/4">
              <h5 className="mb-4 text-brand-500">Developers</h5>
              <ul className="flex flex-col gap-2 mb-4 text-sm">
                <li>
                  <a href="/">Github</a>
                </li>
                <li>
                  <a href="/">
                    API <small>(Coming soon)</small>
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/4">
              <h5 className="mb-4 text-brand-500">Support</h5>
              <ul className="flex flex-col gap-2 mb-4 text-sm">
                <li>
                  <a href="/">FAQs</a>
                </li>
                <li>
                  <a href="/">Contact</a>
                </li>
              </ul>
            </div>
          </Container>
          <Container className="text-sm text-center">
            <hr className="my-8 border-gray-500" />
            Copyright @{new Date().getFullYear()} Hyperbit. All Rights Reserved.
          </Container>
        </footer>
      </main>
    </>
  );
}
