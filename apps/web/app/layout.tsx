import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Provider } from "~/_components/Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hyperbit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={clsx(
          "h-full flex flex-col overflow-hidden",
          inter.className
        )}
      >
        <Provider>{children}</Provider>
      </body>
      <GoogleAnalytics gaId="G-DYZWKX01BP" />
    </html>
  );
}
