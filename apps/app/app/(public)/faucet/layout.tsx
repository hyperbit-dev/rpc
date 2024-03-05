import { ReactNode } from "react";

type FaucetPageLayoutProps = {
  children: ReactNode;
};

export default function FaucetPageLayout({ children }: FaucetPageLayoutProps) {
  return (
    <div className="flex items-center justify-center flex-1">{children}</div>
  );
}
