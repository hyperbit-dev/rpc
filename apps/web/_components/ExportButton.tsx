"use client";

import { Button } from "@hyperbit-private/react";
import React from "react";
import { downloadToJSON } from "~/_lib/json";

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
      onClick={() => downloadToJSON(fileName, data)}
      variant="link"
    >
      Export &dArr;
    </Button>
  );
}
