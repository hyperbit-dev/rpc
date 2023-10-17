import React from "react";
import { Button } from "./Button";
import { downloadToJSON } from "@/lib/json";

export function ExportButton({
  fileName,
  data,
}: {
  fileName: string;
  data: any;
}) {
  return (
    <Button
      type="button"
      Color="brand-500"
      onClick={() => downloadToJSON(fileName, data)}
      Link
    >
      Export &dArr;
    </Button>
  );
}
