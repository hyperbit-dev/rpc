'use client';

import { Metadata } from "next";
import React from "react";
import { Providers } from "./providers";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Hyperbit",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-blue-50/50 dark:bg-gray-900">
      <body
        className="flex flex-col w-full h-full mx-auto overflow-hidden font-brand"
        style={{ width: "500px", minHeight: "600px" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
