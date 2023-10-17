import React from "react";

export function JsonContent({ data }: { data: any }) {
  return (
    <pre className="p-2 overflow-auto text-xs bg-white border border-gray-200 rounded-md">
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}
