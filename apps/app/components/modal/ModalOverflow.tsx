import { Slot } from "@radix-ui/react-slot";

export function ModalOverflow({
  asChild,
  ...props
}: {
  children: React.ReactNode;
  asChild?: React.ReactNode;
}) {
  const Comp = asChild ? Slot : "div";
  return <Comp className="p-4 overflow-y-auto" {...props} />;
}
