"use client";

import { Overview } from "./components";

export function AccountPage() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/3">
        <Overview />
      </div>
    </div>
  );
}
