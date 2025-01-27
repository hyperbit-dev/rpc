import { tv } from "tailwind-variants";

export const baseModal = tv({
  base: [
    "z-30 flex flex-col fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] rounded-md bg-secondary-500 p-[25px] focus:outline-none",
    "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]",
    'data-[state=open]:animate-contentShow -translate-x-1/2 -translate-y-1/2',
    'text-gray-100'
  ],
  variants: {
    size: {
      sm: "max-w-md",
      md: "max-w-xl",
      lg: "max-w-3xl",
      xl: "max-w-5xl",
    },
  },
});
