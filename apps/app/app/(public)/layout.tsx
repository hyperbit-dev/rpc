import { Navbar } from "~/_components/Navbar";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 h-full overflow-auto">
        {children}
      </main>
    </>
  );
}
