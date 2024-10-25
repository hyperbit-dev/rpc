import React from "react";
import { Content } from "./components/Content";

export async function ExplorerContainer({
  params,
}: {
  params: Promise<{ blockchain: string }>;
}) {
  const blockchain = (await params).blockchain;
  return <Content blockchain={blockchain} />;
}
