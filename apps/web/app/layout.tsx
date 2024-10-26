import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import clsx from "clsx";
import { Provider } from "~/_components/Provider";
import "./globals.css";
import { circular, tahoma } from "@/styles/fonts";

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
      className={clsx("h-full", tahoma.className, circular.className)}
    >
      <body className={clsx("h-full flex flex-col overflow-hidden")}>
        <Provider>{children}</Provider>
      </body>
      <GoogleAnalytics gaId="G-DYZWKX01BP" />
    </html>
  );
}
