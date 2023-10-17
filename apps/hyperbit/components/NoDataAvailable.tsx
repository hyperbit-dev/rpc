import React from "react";
import { SectionCard } from "./SectionCard";

export function NoDataAvailable() {
  return (
    <SectionCard>
      <h3 className="p-2 text-lg">No Data Available</h3>
    </SectionCard>
  );
}
