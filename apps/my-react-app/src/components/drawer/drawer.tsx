import { useState } from "react";
import * as DrawerPrimitives from "@radix-ui/react-dialog";

import { DrawerContent } from "./drawer-content";
import { DrawerHeader } from "./drawer-header";
import { DrawerTitle } from "./drawer-title";
import { DrawerDescription } from "./drawer-description";
import { DrawerBody } from "./drawer-body";
import { DrawerFooter } from "./drawer-footer";

// import { focusRing } from "@/lib/utils"

type DrawerProps = {
  Title: React.ReactNode;
  Description?: React.ReactNode;
  Content: React.ReactNode;
  Trigger: React.ReactNode;
  Footer?: React.ReactNode;
};

export function Drawer({
  Title,
  Description,
  Content,
  Trigger,
  Footer,
}: DrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerPrimitives.Root open={open} onOpenChange={setOpen}>
      <DrawerPrimitives.Trigger asChild>{Trigger}</DrawerPrimitives.Trigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{Title}</DrawerTitle>
          <DrawerDescription>{Description}</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="overflow-y-auto">{Content}</DrawerBody>
        {Footer ? <DrawerFooter>{Footer}</DrawerFooter> : undefined}
      </DrawerContent>
    </DrawerPrimitives.Root>
  );
}
