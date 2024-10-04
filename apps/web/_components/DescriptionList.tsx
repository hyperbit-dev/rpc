import { ReactNode } from "react";

type DescriptionListProps = {
  children?: ReactNode;
};

export function DescriptionList({ children }: DescriptionListProps) {
  return (
    <dl className="overflow-x-auto text-sm border border-gray-200 divide-y rounded-lg">
      {children}
    </dl>
  );
}
