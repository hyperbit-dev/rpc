import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import clsx from "clsx";
import { Provider } from "~/_components/Provider";
import { workSans } from "@/styles/fonts";
import "./globals.css";
import { NavFooter } from "@/_components/NavFooter";

export const metadata: Metadata = {
  title: "Hyperbit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        "h-full",
        // tasaOrbiter.variable,
        // tahoma.variable,
        // circular.variable,
        workSans.variable,
      )}
    >
      <body
        className={clsx(
          "h-full",
          // tasaOrbiter.className,
          // tahoma.className,
          // circular.className,
          workSans.className
        )}
      >
        <Provider>{children}</Provider>
        <NavFooter />
      </body>
      <GoogleAnalytics gaId="G-DYZWKX01BP" />
    </html>
  );
}
