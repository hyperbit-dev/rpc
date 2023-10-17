import clsx from "clsx";
import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export function SidebarLink({
  children,
  to,
  ...props
}: {
  children: ReactNode;
  to: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return clsx(
          isActive && "bg-gray-900 text-white",
          "block p-2 rounded-lg hover:bg-gray-900 hover:text-white active:bg-gray-900 active:text-white focus:bg-gray-900 focus:text-white"
        );
      }}
      {...props}
    >
      {children}
    </NavLink>
  );
}
