import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/_components/Providers";
import "./globals.css";

const avenir = localFont({
  src: [
    {
      path: "./avenir.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./avenir-medium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./avenir-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Coin Forge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${avenir.className} bg-gray-900 text-gray-300`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
