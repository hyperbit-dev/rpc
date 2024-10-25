"use client";

import clsx from "clsx";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

const navigation = [
  { name: "Explorers", href: "/explorers" },
  { name: "Faucet", href: "/faucet" },
  { name: "Resources", href: "/resources" },
];

export function Navbar({ Theme = "dark" }: { Theme?: "light" | "dark" }) {
  // const { data: session } = useSession();

  // function handleLogin() {
  //   signIn("google");
  // }

  // function handleSignOut() {
  //   signOut();
  // }

  return (
    <Disclosure
      as="nav"
      className={clsx(
        "relative z-20 border-b",
        Theme === "light" ? "border-transparent" : "border-gray-200"
      )}
    >
      {({ open }) => (
        <>
          <Container
            className={clsx({
              "bg-brand-500": open && Theme === "light",
            })}
          >
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className={clsx(
                    "relative inline-flex items-center justify-center p-2 rounded-md",
                    "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white",
                    "action:bg-brand-500 action:text-white"
                  )}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className={clsx(
                        "block w-6 h-6",
                        Theme === "light" ? "text-white" : "text-black"
                      )}
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
                      className={clsx(
                        "block w-6 h-6",
                        Theme === "light" ? "text-white" : "text-black"
                      )}
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <Link
                  href="/"
                  className="flex items-center flex-shrink-0 gap-2 select-none"
                >
                  {Theme === "dark" ? (
                    <Image src="/logo.svg" alt="Logo" width="25" height="25" />
                  ) : (
                    <Image
                      src="/logo-white.svg"
                      alt="Logo"
                      width="25"
                      height="25"
                    />
                  )}
                  <span
                    className={clsx("text-lg font-medium leading-none", {
                      "text-white": Theme === "light",
                    })}
                  >
                    Hyperbit
                  </span>
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          "rounded-md p-2 text-sm font-medium",
                          Theme === "light"
                            ? "text-white action:text-brand-800"
                            : "text-gray-900 action:text-brand-500"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <a href="https://github.com/hyperbit-dev" target="_blank">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 20 20"
                    version="1.1"
                  >
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        transform="translate(-140.000000, -7559.000000)"
                        fill={Theme === "light" ? "#ffffff" : "#000000"}
                      >
                        <g transform="translate(56.000000, 160.000000)">
                          <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
              {/* {session ? (
                <div className="flex items-center pr-2">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/account"
                              className={clsx(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              My Account
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={clsx(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              className={clsx(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                              )}
                              onClick={handleSignOut}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : <button
                type="button"
                className={clsx("rounded-md p-2 text-sm font-medium")}
                onClick={handleLogin}
              >
                Login
              </button>
              undefined} */}
            </div>
          </Container>

          <Disclosure.Panel className="bg-white sm:hidden">
            <div className="absolute left-0 w-full px-2 pt-2 pb-3 space-y-1 bg-white top-16">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={clsx(
                    "action:text-brand-500",
                    "block rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
