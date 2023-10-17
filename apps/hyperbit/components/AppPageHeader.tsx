import { ReactNode } from "react";

type AppPageHeaderProps = {
  title: ReactNode;
  children?: ReactNode;
};

export function AppPageHeader({ title, children }: AppPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 ">
      <h1 className="text-xl font-normal">{title}</h1>
      {children}
    </div>
  );
}
