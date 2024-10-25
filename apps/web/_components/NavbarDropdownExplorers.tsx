"use client";

import clsx from "clsx";
import { Fragment } from "react";
import { Menu, Tab, Transition } from "@headlessui/react";
import { Container } from "./Container";
import Link from "next/link";

export function NavbarDropdownExplorers() {
  return (
    <Menu as="div">
      <div>
        <Menu.Button
          className={clsx(
            "action:text-brand-500",
            "rounded-md p-2 text-sm font-medium",
          )}
        >
          Explorers
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
        <Menu.Items
          className={clsx(
            "absolute left-0 right-0 origin-top-left",
            "z-40 w-full py-1 mt-4 rounded-b-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-gray-100 py-4",
          )}
        >
          <Container>
            <div className="flex items-stretch h-full gap-2">
              <Tab.Group>
                <div className="w-48">
                  <div className="my-4 text-sm font-medium text-gray-500">
                    Explorers
                  </div>
                  <Tab.List className="flex flex-col gap-2">
                    <Tab
                      key="ravencoin"
                      className={({ selected }) =>
                        clsx(
                          "w-full rounded-lg px-2.5 py-4 text-left text-sm font-medium leading-5 relative",
                          "flex items-center gap-2",
                          "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-white shadow-sm text-[#f15b22]"
                            : "action:text-[#f15b22] duration-300 ease",
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#f15b22"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                        />
                      </svg>
                      Ravencoin
                    </Tab>
                    <Tab
                      key="evrmore"
                      className={({ selected }) =>
                        clsx(
                          "w-full rounded-lg px-2.5 py-4 text-left text-sm font-medium leading-5 relative",
                          "flex items-center gap-2",
                          "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-white shadow-sm text-[#21CCFF]"
                            : "action:text-[#21CCFF] duration-300 ease",
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#21CCFF"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                        />
                      </svg>
                      Evrmore
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels className="w-full">
                  <Tab.Panel
                    key="ravencoin"
                    className={clsx(
                      "rounded-lg bg-white p-4 h-full flex-1",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    )}
                  >
                    <div className="mb-4 text-sm font-medium text-gray-500">
                      Resources
                    </div>
                    <ul className="flex flex-col gap-1 text-sm list-none">
                      <li>
                        <Menu.Item>
                          <Link
                            href="/explorers/trvn"
                            className="flex items-center inline-block gap-2 p-1 action:text-[#f15b22]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                              />
                            </svg>
                            Testnet Explorer
                          </Link>
                        </Menu.Item>
                      </li>
                      <li>
                        <Menu.Item>
                          <Link
                            href="/explorers/trvn/assets"
                            className="flex items-center inline-block gap-2 p-1 action:text-[#f15b22]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                              />
                            </svg>
                            Testnet Assets
                          </Link>
                        </Menu.Item>
                      </li>
                    </ul>
                  </Tab.Panel>
                  <Tab.Panel
                    key="evrmore"
                    className={clsx(
                      "rounded-lg bg-white p-4 h-full flex-1",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    )}
                  >
                    <div className="mb-4 text-sm font-medium text-gray-500">
                      Resources
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </Container>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
