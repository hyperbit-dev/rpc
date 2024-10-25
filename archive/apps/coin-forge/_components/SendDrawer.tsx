import Drawer from "rc-drawer";
import { useState } from "react";

import "../../../node_modules/rc-drawer/assets/index.css";

type SendDrawerProps = {
  open?: boolean;
  setOpen: (open?: boolean) => void;
};

export function SendDrawer({ open = false, setOpen }: SendDrawerProps) {
  const onTouchEnd = () => {
    setOpen(false);
  };
  const onSwitch = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      open={open}
      // defaultOpen
      onClose={onTouchEnd}
      afterOpenChange={(c: boolean) => {
        console.log("transitionEnd: ", c);
      }}
      placement="right"
      // width={400}
      width="60%"
    >
      Test
    </Drawer>
  );
}
