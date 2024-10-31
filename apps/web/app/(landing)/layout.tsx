import { Navbar } from "~/_components/Navbar";
import { ReactNode } from "react";
import NavigationMenuDemo from "@/_components/Navigation";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
