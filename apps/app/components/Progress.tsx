import React from "react";

interface ProgressProps {
  value: number;
}

export function Progress({ value }: ProgressProps) {
  return (
    <div
      className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
