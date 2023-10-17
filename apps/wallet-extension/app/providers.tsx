// app/providers.tsx
"use client";

// import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col justify-center w-full h-full mx-auto overflow-hidden"
      style={{ minHeight: "600px" }}
    >
      {children}
    </div>
  );
}
