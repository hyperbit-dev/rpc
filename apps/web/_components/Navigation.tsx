import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { CaretDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import clsx from "clsx";
import { workSans } from "@/styles/fonts";
import Image from "next/image";
import { Container } from "./Container";

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu.Root className="relative z-10 w-full bg-white py-4 border-b border-gray-300">
      <Container>
        <div className="relative flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center flex-shrink-0 gap-2 select-none absolute left-4"
          >
            <Image src="/logo.svg" alt="Logo" width="25" height="25" />
            {/* <Image src="/logo-white.svg" alt="Logo" width="25" height="25" /> */}
            <span
              className={clsx(
                "text-xl font-bold leading-none text-gray-800",
                workSans.className
              )}
            >
              Hyperbit
            </span>
          </Link>
          <NavigationMenu.List className="flex items-center justify-center w-full center m-0 list-none p-1 space-x-4">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-normal leading-none text-gray-700 outline-none hover:text-brand-600 focus:text-brand-600 active:text-brand-600">
                Products
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute left-0 top-0 w-full sm:w-auto">
                <ul className="m-0 grid list-none gap-x-2.5 p-4 sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
                  <ListItem title="Block Explorers" href="/explorers">
                    Access live blockchain insights.
                  </ListItem>
                  {/* <ListItem title="Mining Pools" href="/minig-pools">
                A quick tutorial to get you up and running with Radix
                Primitives.
              </ListItem>
              <ListItem title="RPC APIs" href="/products/rpc">
                Unstyled and compatible with any styling solution.
              </ListItem>
              <ListItem
                title="Animation"
                href="/primitives/docs/guides/animation"
              >
                Use CSS keyframes or any animation library of your choice.
              </ListItem>
              <ListItem
                title="Accessibility"
                href="/primitives/docs/overview/accessibility"
              >
                Tested in a range of browsers and assistive technologies.
              </ListItem>
              <ListItem
                title="Releases"
                href="/primitives/docs/overview/releases"
              >
                Radix Primitives releases and their changelogs.
              </ListItem> */}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-normal leading-none text-gray-700 outline-none hover:text-brand-600 focus:text-brand-600 active:text-brand-600">
            Solutions
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-0 w-full sm:w-auto">
            <ul className="m-0 grid list-none gap-x-2.5 p-4 sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
              <ListItem title="Developer Tools" href="/explorers">
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem title="Asset Tokenization" href="/minig-pools">
                A quick tutorial to get you up and running with Radix
                Primitives.
              </ListItem>
              <ListItem title="Financial Services" href="/products/rpc">
                Unstyled and compatible with any styling solution.
              </ListItem>
              <ListItem
                title="Gaming"
                href="/primitives/docs/guides/animation"
              >
                Use CSS keyframes or any animation library of your choice.
              </ListItem>
              <ListItem
                title="NFT Colletibles"
                href="/primitives/docs/overview/accessibility"
              >
                Tested in a range of browsers and assistive technologies.
              </ListItem>
              <ListItem
                title="Enterprise"
                href="/primitives/docs/overview/releases"
              >
                Radix Primitives releases and their changelogs.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item> */}

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-normal leading-none text-gray-700 outline-none hover:text-brand-600 focus:text-brand-600 active:text-brand-600">
                Developers
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute left-0 top-0 w-full sm:w-auto">
                <ul className="m-0 grid list-none p-4 sm:w-[400px] sm:grid-flow-col sm:grid-rows-4">
                  {/* <ListItem
                title="Docs"
                href="/primitives/docs/overview/introduction"
              >
                Build high-quality, accessible design systems and web apps.
              </ListItem> */}
                  {/* <ListItem
                title="Tutorials"
                href="/primitives/docs/overview/releases"
              >
                Build high-quality, accessible design systems and web apps.
              </ListItem> */}
                  <ListItem title="Faucets" href="/faucet">
                  Claim small crypto rewards and test transactions.
                  </ListItem>
                  <ListItem
                    title="Open Source"
                    href="https://github.com/hyperbit-dev"
                    target="_blank"
                  >
                    Join our open-source blockchain efforts.
                  </ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-normal leading-none text-gray-700 outline-none hover:text-brand-600 focus:text-brand-600 active:text-brand-600">
            Resources
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-0 w-full sm:w-auto">
            <ul className="m-0 grid list-none p-4 sm:w-[400px] sm:grid-flow-col sm:grid-rows-4">
              <ListItem
                title="Docs"
                href="/primitives/docs/overview/introduction"
              >
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Tutorials"
                href="/primitives/docs/overview/releases"
              >
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem title="Faucets" href="/primitives/docs/guides/styling">
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Open Source"
                href="/primitives/docs/overview/getting-started"
              >
                Build high-quality, accessible design systems and web apps.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item> */}

            {/* <NavigationMenu.Item>
          <NavigationMenu.Link
            className="block select-none rounded px-3 py-2 text-[15px] font-normal leading-none text-gray-700 no-underline outline-none hover:text-brand-600 focus:text-brand-600 active:text-brand-600"
            href="/pricing"
          >
            Pricing
          </NavigationMenu.Link>
        </NavigationMenu.Item> */}

            <NavigationMenu.Indicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
              <div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-white" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
            <NavigationMenu.Viewport className="drop-shadow-lg relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md bg-white transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
          </div>
        </div>
      </Container>
    </NavigationMenu.Root>
  );
};

interface ListItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children: React.ReactNode;
  title: string;
  href: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, children, title, href, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          href={href}
          className={classNames(
            "group block select-none rounded-md p-3 text-[15px] leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
          ref={forwardedRef}
        >
          <div className="mb-[5px] font-normal group-hover:text-brand-600 group-active:text-brand-600 group-focus:text-brand-600">
            {title}
          </div>
          <p className="leading-[1.4] text-gray-500">{children}</p>
        </Link>
      </NavigationMenu.Link>
    </li>
  )
);

export default NavigationMenuDemo;
