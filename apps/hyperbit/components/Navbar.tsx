"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Container } from "./Container";
import { config } from "@/lib/config";
import { getValidSubdomain } from "@/lib/subdomain";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Chip } from "@slipstreamui/react";

export function Navbar({ subdomain }: { subdomain?: string }) {
  const { status } = useSession();
  const sub = subdomain ?? getValidSubdomain();
  const chain = sub ? config.chains[sub] : undefined;
  const host = window.location.host;
  const domain = host.includes('.') ? host.split('.')[1] : host;

  return (
    <nav className="relative z-20 bg-secondary-500">
      <Container>
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0 gap-2 font-semibold text-white">
              <a
                className="flex items-center gap-2"
                href={process.env.NEXT_PUBLIC_HOST}
              >
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
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavigationMenu.Root className="relative z-10 flex justify-center w-vw">
                  <NavigationMenu.List className="flex justify-center m-0">
                    <NavigationMenu.Item>
                      <NavigationMenu.Trigger asChild>
                        <div className="flex items-center px-3 py-2 text-sm font-medium text-white rounded-md cursor-pointer hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900">
                          Explorers
                          <CaretDownIcon className="text-white" aria-hidden />
                        </div>
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="absolute top-0 z-40 w-full p-2 text-black bg-white rounded left-20 sm:-left-12 sm:w-auto drop-shadow-lg">
                        <ul className="flex">
                          <li style={{ gridRow: "span 3" }}>
                            <NavigationMenu.Link asChild>
                              <div className="flex flex-col items-center p-2 mr-2 text-white rounded bg-gradient-to-r from-blue-400 to-blue-500">
                                <svg
                                  className="w-20 h-20 mb-4 fill-white"
                                  viewBox="0 0 470 470"
                                >
                                  <g>
                                    <path d="M211.683,151.084c-2.086-3.58-6.679-4.788-10.256-2.705l-51.978,30.281c-3.579,2.085-4.79,6.677-2.705,10.256   c1.394,2.392,3.906,3.726,6.487,3.726c1.282,0,2.581-0.329,3.769-1.021l51.978-30.281   C212.557,159.255,213.768,154.663,211.683,151.084z" />
                                    <path d="M261.021,161.34l51.978,30.28c1.188,0.691,2.486,1.021,3.769,1.021c2.581,0,5.094-1.334,6.487-3.726   c2.085-3.579,0.874-8.171-2.705-10.256l-51.978-30.28c-3.579-2.084-8.17-0.875-10.256,2.705   C256.231,154.663,257.442,159.255,261.021,161.34z" />
                                    <path d="M149.551,356.399l51.877,30.223c1.188,0.692,2.486,1.021,3.769,1.021c2.581,0,5.094-1.334,6.487-3.726   c2.085-3.579,0.874-8.171-2.705-10.256l-51.877-30.223c-3.579-2.088-8.17-0.874-10.256,2.705   C144.761,349.723,145.972,354.314,149.551,356.399z" />
                                    <path d="M465.642,267.424c-0.006-0.597-0.084-1.196-0.235-1.787c-0.019-0.072-0.04-0.142-0.061-0.213   c-0.063-0.218-0.137-0.434-0.221-0.649c-0.029-0.076-0.057-0.151-0.089-0.226c-0.102-0.238-0.217-0.472-0.346-0.703   c-0.018-0.032-0.032-0.067-0.051-0.099c-0.16-0.277-0.323-0.515-0.494-0.745c-0.04-0.054-0.084-0.104-0.126-0.156   c-0.148-0.187-0.303-0.366-0.466-0.536c-0.053-0.055-0.106-0.109-0.161-0.163c-0.185-0.181-0.376-0.352-0.577-0.511   c-0.034-0.027-0.065-0.056-0.099-0.082c-0.243-0.186-0.495-0.356-0.756-0.51c-0.039-0.026-107.888-62.857-107.888-62.857V72.5   c0-0.026-0.005-0.05-0.005-0.076c-0.006-0.597-0.084-1.196-0.235-1.787c-0.019-0.072-0.04-0.142-0.061-0.213   c-0.063-0.218-0.137-0.434-0.221-0.649c-0.029-0.076-0.057-0.151-0.089-0.226c-0.102-0.238-0.217-0.472-0.346-0.703   c-0.018-0.032-0.032-0.067-0.051-0.099c-0.16-0.278-0.323-0.516-0.495-0.746c-0.039-0.052-0.082-0.101-0.122-0.152   c-0.15-0.19-0.307-0.371-0.471-0.542c-0.051-0.053-0.102-0.105-0.155-0.156c-0.188-0.185-0.384-0.36-0.589-0.522   c-0.029-0.023-0.056-0.049-0.086-0.071c-0.245-0.189-0.5-0.36-0.764-0.516C350.349,66.02,238.775,1.02,238.775,1.02   c-2.334-1.359-5.217-1.359-7.551,0l-111.573,65c-0.297,0.178-0.554,0.351-0.801,0.54c-0.027,0.021-0.052,0.044-0.079,0.066   c-0.207,0.164-0.405,0.34-0.595,0.527c-0.052,0.051-0.102,0.102-0.153,0.155c-0.165,0.172-0.322,0.354-0.472,0.544   c-0.04,0.051-0.083,0.099-0.122,0.151c-0.172,0.23-0.335,0.468-0.483,0.722c-0.031,0.056-0.045,0.09-0.063,0.123   c-0.129,0.231-0.244,0.465-0.346,0.703c-0.032,0.074-0.06,0.15-0.089,0.226c-0.084,0.214-0.158,0.43-0.221,0.649   c-0.021,0.071-0.042,0.141-0.06,0.213c-0.152,0.591-0.23,1.19-0.235,1.787c0,0.025-0.005,0.05-0.005,0.076v125.689L8.078,261.02   c-0.3,0.18-0.553,0.35-0.796,0.537c-0.033,0.026-0.064,0.054-0.097,0.08c-0.201,0.16-0.393,0.331-0.578,0.512   c-0.054,0.053-0.108,0.107-0.16,0.162c-0.163,0.17-0.318,0.349-0.466,0.536c-0.042,0.053-0.086,0.103-0.126,0.157   c-0.171,0.229-0.334,0.467-0.482,0.72c-0.031,0.056-0.045,0.09-0.063,0.123c-0.129,0.231-0.244,0.465-0.346,0.703   c-0.032,0.074-0.06,0.15-0.089,0.226c-0.084,0.214-0.158,0.43-0.221,0.649c-0.021,0.071-0.042,0.141-0.06,0.213   c-0.152,0.591-0.23,1.19-0.235,1.787c0,0.025-0.005,0.05-0.005,0.076v130c0,2.669,1.419,5.137,3.725,6.48l111.573,65   c0.021,0.012,0.044,0.02,0.065,0.032c0.268,0.153,0.545,0.293,0.833,0.413c0.28,0.116,0.562,0.208,0.85,0.289   c0.071,0.02,0.143,0.037,0.215,0.055c0.225,0.056,0.454,0.101,0.687,0.136c0.077,0.012,0.152,0.026,0.229,0.035   c0.295,0.035,0.593,0.059,0.897,0.059s0.603-0.023,0.897-0.059c0.077-0.009,0.152-0.023,0.229-0.035   c0.233-0.035,0.462-0.08,0.687-0.136c0.072-0.018,0.144-0.035,0.215-0.055c0.288-0.081,0.57-0.173,0.843-0.286   c0.294-0.122,0.571-0.262,0.839-0.416c0.021-0.012,0.044-0.02,0.065-0.032L235,406.18l107.798,62.801   c0.021,0.012,0.044,0.02,0.065,0.032c0.268,0.153,0.544,0.293,0.832,0.413c0.281,0.116,0.562,0.208,0.849,0.289   c0.072,0.02,0.144,0.038,0.216,0.056c0.225,0.056,0.453,0.101,0.686,0.136c0.077,0.012,0.153,0.026,0.23,0.035   c0.295,0.035,0.593,0.059,0.897,0.059s0.602-0.023,0.897-0.059c0.077-0.009,0.153-0.023,0.23-0.035   c0.232-0.035,0.461-0.08,0.686-0.136c0.072-0.018,0.144-0.035,0.216-0.056c0.287-0.081,0.569-0.173,0.841-0.286   c0.296-0.123,0.572-0.263,0.84-0.416c0.021-0.012,0.044-0.02,0.065-0.032l111.573-65c2.306-1.344,3.725-3.812,3.725-6.48v-130   C465.646,267.474,465.642,267.45,465.642,267.424z M443.247,267.5l-96.674,56.32l-96.674-56.32l96.674-56.32L443.247,267.5z    M130.927,85.549l96.573,56.261v112.64l-96.573-56.261V85.549z M339.073,198.189L242.5,254.451v-112.64l96.573-56.261V198.189z    M227.5,393.189l-96.573,56.262v-112.64l96.573-56.261V393.189z M242.5,280.549l96.573,56.261v112.64L242.5,393.189V280.549z    M235,16.18l96.674,56.32L235,128.82L138.326,72.5L235,16.18z M123.427,211.18l96.674,56.32l-96.674,56.32L26.753,267.5   L123.427,211.18z M19.354,280.549l96.573,56.261v112.64l-96.573-56.262V280.549z M354.073,449.451v-112.64l96.573-56.261v112.64   L354.073,449.451z" />
                                    <path d="M323.156,346.142c-2.086-3.58-6.678-4.788-10.256-2.705l-51.877,30.223c-3.579,2.085-4.79,6.677-2.705,10.256   c1.394,2.392,3.906,3.726,6.487,3.726c1.282,0,2.581-0.329,3.769-1.021l51.877-30.223   C324.03,354.313,325.241,349.721,323.156,346.142z" />
                                    <path d="M100.109,346.084c-2.086-3.58-6.679-4.788-10.256-2.705l-51.877,30.223c-3.579,2.085-4.79,6.677-2.705,10.256   c1.394,2.392,3.906,3.726,6.487,3.726c1.282,0,2.581-0.329,3.769-1.021l51.877-30.223   C100.983,354.255,102.194,349.663,100.109,346.084z" />
                                    <path d="M432.024,373.603l-51.676-30.105c-3.579-2.087-8.171-0.875-10.256,2.705c-2.085,3.579-0.874,8.171,2.705,10.256   l51.676,30.105c1.188,0.692,2.486,1.021,3.769,1.021c2.581,0,5.094-1.334,6.487-3.726   C436.814,380.279,435.604,375.688,432.024,373.603z" />
                                  </g>
                                </svg>
                                <div className="text-center">
                                  Blockchain Explorers
                                </div>
                              </div>
                            </NavigationMenu.Link>
                          </li>
                          <ul
                            className="flex flex-col gap-1"
                            style={{ minWidth: "150px" }}
                          >
                            <li>
                              <a
                                href={`//trvn.${domain}/explorer`}
                                className="block px-2 py-1 text-sm rounded whitespace-nowrap bg-gradient-to-r action:from-blue-400 action:to-blue-500 action:text-white"
                              >
                                Ravencoin (Testnet)
                              </a>
                            </li>
                            <li>
                              <a
                                href={`//tevr.${domain}/explorer`}
                                className="block px-2 py-1 text-sm rounded whitespace-nowrap bg-gradient-to-r action:from-blue-400 action:to-blue-500 action:text-white"
                              >
                                Evrmore (Testnet)
                              </a>
                            </li>
                          </ul>
                          {/* <ListItem
                            href="https://stitches.dev/"
                            title="Stitches"
                          >
                            CSS-in-JS with best-in-class developer experience.
                          </ListItem>
                          <ListItem href="/colors" title="Colors">
                            Beautiful, thought-out palettes with auto dark mode.
                          </ListItem>
                          <ListItem
                            href="https://icons.radix-ui.com/"
                            title="Icons"
                          >
                            A crisp set of 15x15 icons, balanced and consistent.
                          </ListItem> */}
                        </ul>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                  </NavigationMenu.List>
                  <div
                    className="absolute left-0 flex justify-center w-full bg-white top-full"
                    style={{ perspective: "2000px" }}
                  >
                    <NavigationMenu.Viewport className="relative" />
                  </div>
                </NavigationMenu.Root>
                <NavigationMenu.Root className="relative z-10 flex justify-center w-vw">
                  <NavigationMenu.List className="flex justify-center m-0">
                    <NavigationMenu.Item>
                      <NavigationMenu.Trigger asChild>
                        <div className="flex items-center px-3 py-2 text-sm font-medium text-white rounded-md cursor-pointer hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900">
                          Faucets
                          <CaretDownIcon className="text-white" aria-hidden />
                        </div>
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="absolute top-0 z-40 w-full p-2 text-black bg-white rounded left-20 sm:-left-12 sm:w-auto drop-shadow-lg">
                        <ul className="flex">
                          <li style={{ gridRow: "span 3" }}>
                            <NavigationMenu.Link asChild>
                              <div className="flex flex-col items-center p-2 mr-2 text-white rounded bg-gradient-to-r from-violet-400 to-violet-500">
                                <svg
                                  className="w-20 h-20 mb-4 fill-white"
                                  viewBox="0 0 470 470"
                                >
                                  <g>
                                    <path d="M470,235c0-15.339-10.685-28.221-25-31.617v-67.381c14.315-3.396,25-16.278,25-31.617c0-17.92-14.579-32.5-32.5-32.5   c-15.339,0-28.221,10.685-31.617,25h-67.381c-3.396-14.315-16.278-25-31.617-25c-15.339,0-28.221,10.685-31.617,25h-67.381   c-3.396-14.315-16.278-25-31.617-25c-17.92,0-32.5,14.58-32.5,32.5c0,15.339,10.685,28.221,25,31.617v67.381   c-14.315,3.396-25,16.278-25,31.617s10.685,28.221,25,31.617v67.381c-14.315,3.396-25,16.278-25,31.617   c0,17.92,14.58,32.5,32.5,32.5c15.339,0,28.221-10.685,31.617-25h67.381c3.396,14.315,16.278,25,31.617,25   c15.339,0,28.221-10.685,31.617-25h67.381c3.396,14.315,16.278,25,31.617,25c17.921,0,32.5-14.58,32.5-32.5   c0-15.339-10.685-28.221-25-31.617v-67.381C459.315,263.221,470,250.339,470,235z M405.883,358.115h-67.381   c-3.396-14.315-16.278-25-31.617-25c-15.339,0-28.221,10.685-31.617,25h-67.381c-2.824-11.906-12.211-21.292-24.117-24.117v-67.381   c14.315-3.396,25-16.278,25-31.617s-10.685-28.221-25-31.617v-67.381c11.906-2.824,21.292-12.211,24.117-24.117h67.381   c3.396,14.315,16.278,25,31.617,25c15.339,0,28.221-10.685,31.617-25h67.381c2.824,11.906,12.211,21.292,24.117,24.117v67.381   c-14.315,3.396-25,16.278-25,31.617s10.685,28.221,25,31.617v67.381C418.094,336.822,408.708,346.209,405.883,358.115z M455,235   c0,9.649-7.851,17.5-17.5,17.5S420,244.649,420,235s7.851-17.5,17.5-17.5S455,225.351,455,235z M437.5,86.885   c9.649,0,17.5,7.851,17.5,17.5s-7.851,17.5-17.5,17.5s-17.5-7.851-17.5-17.5S427.851,86.885,437.5,86.885z M306.886,86.885   c9.649,0,17.5,7.851,17.5,17.5s-7.851,17.5-17.5,17.5s-17.5-7.851-17.5-17.5S297.236,86.885,306.886,86.885z M158.771,104.385   c0-9.649,7.851-17.5,17.5-17.5s17.5,7.851,17.5,17.5s-7.851,17.5-17.5,17.5S158.771,114.035,158.771,104.385z M158.771,235   c0-9.649,7.851-17.5,17.5-17.5s17.5,7.851,17.5,17.5s-7.851,17.5-17.5,17.5S158.771,244.649,158.771,235z M176.271,383.115   c-9.649,0-17.5-7.851-17.5-17.5s7.851-17.5,17.5-17.5s17.5,7.851,17.5,17.5S185.92,383.115,176.271,383.115z M306.886,383.115   c-9.649,0-17.5-7.851-17.5-17.5s7.851-17.5,17.5-17.5s17.5,7.851,17.5,17.5S316.535,383.115,306.886,383.115z M455,365.615   c0,9.649-7.851,17.5-17.5,17.5s-17.5-7.851-17.5-17.5s7.851-17.5,17.5-17.5S455,355.965,455,365.615z" />
                                    <path d="M328.476,227.5h-14.09v-14.091c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5V227.5h-14.091c-4.143,0-7.5,3.358-7.5,7.5   s3.357,7.5,7.5,7.5h14.091v14.091c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5V242.5h14.09c4.143,0,7.5-3.358,7.5-7.5   S332.618,227.5,328.476,227.5z" />
                                    <path d="M7.5,111.885h30c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-30c-4.142,0-7.5,3.358-7.5,7.5S3.358,111.885,7.5,111.885z   " />
                                    <path d="M121.271,96.885H67.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h53.771c4.142,0,7.5-3.358,7.5-7.5   S125.413,96.885,121.271,96.885z" />
                                    <path d="M121.271,149.131H37.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h83.771c4.142,0,7.5-3.358,7.5-7.5   S125.413,149.131,121.271,149.131z" />
                                    <path d="M7.5,268.623h53.771c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H7.5c-4.142,0-7.5,3.358-7.5,7.5   S3.358,268.623,7.5,268.623z" />
                                    <path d="M7.5,216.377h53.771c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H7.5c-4.142,0-7.5,3.358-7.5,7.5   S3.358,216.377,7.5,216.377z" />
                                    <path d="M121.271,201.377h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5   S125.413,201.377,121.271,201.377z" />
                                    <path d="M121.271,358.115H7.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h113.771c4.142,0,7.5-3.358,7.5-7.5   S125.413,358.115,121.271,358.115z" />
                                    <path d="M121.271,305.869H37.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h83.771c4.142,0,7.5-3.358,7.5-7.5   S125.413,305.869,121.271,305.869z" />
                                  </g>
                                </svg>
                                <div className="text-center">
                                  Testnet Faucets
                                </div>
                              </div>
                            </NavigationMenu.Link>
                          </li>
                          <ul
                            className="flex flex-col gap-1"
                            style={{ minWidth: "150px" }}
                          >
                            <li>
                              <a
                                href={`//trvn.${domain}/faucet`}
                                className="block px-2 py-1 text-sm rounded whitespace-nowrap bg-gradient-to-r action:from-violet-400 action:to-violet-500 action:text-white"
                              >
                                Ravencoin
                              </a>
                            </li>
                            <li>
                              <a
                                href={`//tevr.${domain}/faucet`}
                                className="block px-2 py-1 text-sm rounded whitespace-nowrap bg-gradient-to-r action:from-violet-400 action:to-violet-500 action:text-white"
                              >
                                Evrmore
                              </a>
                            </li>
                          </ul>
                          {/* <ListItem
                            href="https://stitches.dev/"
                            title="Stitches"
                          >
                            CSS-in-JS with best-in-class developer experience.
                          </ListItem>
                          <ListItem href="/colors" title="Colors">
                            Beautiful, thought-out palettes with auto dark mode.
                          </ListItem>
                          <ListItem
                            href="https://icons.radix-ui.com/"
                            title="Icons"
                          >
                            A crisp set of 15x15 icons, balanced and consistent.
                          </ListItem> */}
                        </ul>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                  </NavigationMenu.List>
                  <div
                    className="absolute left-0 flex justify-center w-full bg-white top-full"
                    style={{ perspective: "2000px" }}
                  >
                    <NavigationMenu.Viewport className="relative" />
                  </div>
                </NavigationMenu.Root>
                {chain?.features?.assetsEnabled ? (
                  <Link
                    href="/explorer/assets"
                    className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900"
                  >
                    Assets
                  </Link>
                ) : undefined}
                {chain?.features?.masternodesEnabled ? (
                  <Link
                    href="/explorer/masternodes"
                    className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900"
                  >
                    Masternodes
                  </Link>
                ) : undefined}
                <Link
                  href="/api"
                  className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900"
                >
                  API
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <DropdownMenu.Root>
              <div className="relative ml-3">
                <div>
                  <DropdownMenu.Trigger asChild>
                    <button
                      type="button"
                      className="flex p-1 text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      {status === "authenticated" ? (
                        <svg
                          className="w-6 h-6 rounded"
                          viewBox="0 0 420.000000 451.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,451.000000) scale(0.100000,-0.100000)"
                            className="fill-white"
                            stroke="none"
                          >
                            <path d="M1472 4489 c-72 -36 -138 -134 -188 -283 -13 -37 -47 -179 -74 -315 -28 -135 -65 -308 -81 -384 -16 -76 -29 -144 -29 -153 0 -32 276 -135 465 -173 190 -38 276 -46 520 -46 244 0 330 8 520 46 159 32 425 125 425 148 0 16 -161 779 -177 836 -44 166 -143 310 -230 335 -66 20 -108 6 -162 -51 -119 -129 -146 -152 -205 -180 -129 -61 -267 -60 -391 1 -65 32 -104 65 -179 154 -74 87 -133 105 -214 65z" />
                            <path d="M860 3054 c-277 -85 -427 -181 -461 -293 -88 -295 862 -546 1896 -501 943 41 1565 281 1411 544 -57 97 -233 193 -477 260 l-88 24 -81 -34 c-287 -120 -597 -177 -975 -177 -379 0 -688 56 -977 178 -45 19 -94 35 -108 35 -14 -1 -77 -17 -140 -36z" />
                            <path d="M3680 2439 c-41 -34 -157 -89 -280 -133 l-115 -41 -5 -205 c-3 -134 -9 -212 -17 -226 -7 -12 -67 -50 -133 -84 -417 -216 -752 -495 -1031 -858 -182 -238 -358 -574 -433 -832 -18 -62 -22 -65 76 55 84 101 297 310 408 398 307 245 693 448 1099 581 142 47 408 116 445 116 12 0 26 4 33 8 7 4 -86 27 -205 51 -119 24 -221 47 -225 51 -5 4 189 130 430 280 241 150 446 278 455 285 15 10 -12 46 -219 293 -129 155 -240 282 -246 282 -7 -1 -23 -10 -37 -21z" />
                            <path d="M274 2193 c-109 -119 -215 -235 -235 -257 l-36 -41 453 -255 c249 -140 454 -257 454 -260 0 -3 -92 -43 -205 -90 -113 -46 -205 -87 -205 -90 0 -3 278 -145 618 -317 l618 -312 28 52 c16 29 52 87 79 130 l50 79 -34 26 c-229 179 -512 466 -673 685 -159 216 -283 471 -326 672 l-11 50 -103 33 c-56 18 -138 51 -182 72 -43 22 -82 39 -85 40 -3 0 -95 -98 -205 -217z" />
                            <path d="M2960 2195 c-156 -29 -374 -54 -552 -64 -76 -4 -140 -10 -143 -13 -17 -17 -16 -78 3 -120 39 -90 159 -146 327 -155 280 -15 540 122 537 283 0 42 -23 96 -40 93 -4 -1 -63 -12 -132 -24z" />
                            <path d="M1079 2187 c-20 -37 -12 -106 18 -155 121 -194 581 -258 779 -107 46 35 78 105 71 153 -4 19 -7 36 -9 37 -2 2 -86 8 -188 14 -214 13 -423 36 -563 60 -96 17 -98 17 -108 -2z" />
                          </g>
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 rounded fill-white"
                          viewBox="0 0 512 512"
                        >
                          <g>
                            <path d="M364.038,355.035c-19.948-7.458-49.037-29.238-49.037-42.797c0-8.983,0-20.205,0-35.587   c11.528-12.826,20.294-38.864,25.504-68.38c12.152-4.338,19.096-11.281,27.771-41.658c9.221-32.358-13.886-31.258-13.886-31.258   c18.69-61.873-5.913-120.022-47.125-115.753c-28.426-49.73-123.636,11.36-153.468,7.102c0,17.055,7.102,29.842,7.102,29.842   c-10.37,19.69-6.37,58.951-3.458,78.809c-1.684-0.03-22.581,0.188-13.717,31.258c8.676,30.376,15.619,37.32,27.772,41.658   c5.2,29.516,13.965,55.554,25.504,68.38c0,15.382,0,26.604,0,35.587c0,13.559-30.901,36.399-49.036,42.797   c-37.469,13.193-129.54,51.136-123.597,122.21C25.792,494.301,119.577,512,256,512c136.414,0,230.209-17.699,231.635-34.755   C493.577,406.102,401.269,368.961,364.038,355.035z" />
                          </g>
                        </svg>
                      )}
                    </button>
                  </DropdownMenu.Trigger>
                </div>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content asChild>
                    <div
                      className="absolute right-0 z-30 w-48 py-1 mt-2 -mr-5 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                    >
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                      >
                        Account
                      </Link>
                      <Link
                        href="/account/wallets"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                      >
                        Wallets
                      </Link>
                      {status === "authenticated" ? (
                        <button
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={-1}
                          onClick={() => signOut()}
                        >
                          Sign out
                        </button>
                      ) : (
                        <Link
                          href="/auth/connect"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={-1}
                        >
                          Sign In
                        </Link>
                      )}
                    </div>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </div>
            </DropdownMenu.Root>
          </div>
        </div>
      </Container>

      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            Team
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            Projects
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
}
