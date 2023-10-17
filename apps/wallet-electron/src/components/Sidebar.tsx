import React from "react";
import { SidebarLink } from "./SidebarLink";

export function Sidebar() {
  return (
    <aside className="p-5 border-r border-gray-200" style={{ width: "175px" }}>
      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-1">
          <li>
            <SidebarLink to="/admin/overiew">Overview</SidebarLink>
          </li>
          <li>
            <SidebarLink to="/admin/wallets">Wallets</SidebarLink>
          </li>
          <li>
            <SidebarLink to="/admin/send">Send</SidebarLink>
          </li>
          <li>
            <SidebarLink to="/admin/receive">Receive</SidebarLink>
          </li>
        </ul>
        <ul className="flex flex-col gap-1">
          <li>
            <SidebarLink to="/admin/support">Support</SidebarLink>
          </li>
          <li>
            <SidebarLink to="/admin/settings">Settings</SidebarLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
