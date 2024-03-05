import { ReactNode } from "react";
import { PageHeader } from "./PageHeader";

type ExplorerHeaderProps = {
  title?: ReactNode;
  actions?: ReactNode;
};

export function ExplorerHeader({ title, actions }: ExplorerHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <PageHeader>{title}</PageHeader>
      <div className="flex space-x-2 text-sm">{actions}</div>
    </div>
  );
}
