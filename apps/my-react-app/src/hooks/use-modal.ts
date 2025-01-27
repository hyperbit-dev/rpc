import { createContext, useContext } from "react";

export const ModalContext = createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {},
});

export function useModal() {
  const context = useContext(ModalContext);
  const noop = () => {};
  if (context !== null) {
    return {
      open: context.open,
      onOpenChange: (open: boolean) => context.onOpenChange(open),
    };
  }
  return { open: noop, onOpenChange: noop };
}
