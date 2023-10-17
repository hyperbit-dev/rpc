"use client";
import Script from "next/script";

export default function Extension() {
  return (
    <>
      <Script
        src="/extension.js"
        strategy="lazyOnload"
        onLoad={() => {
          // @ts-ignore
          window.createLemonSqueezy();
        }}
      />
      Extension
    </>
  );
}
