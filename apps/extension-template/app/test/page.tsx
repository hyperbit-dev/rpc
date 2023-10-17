import Link from "next/link";
import React from "react";

export default function Test() {
  return (
    <div>
      <Link href="/" as="/index.html">Home</Link>
    </div>
  );
}
