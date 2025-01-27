import { tv } from "tailwind-variants";

export const baseContainer = tv({
  base: "mx-auto w-full",
  variants: {
    size: {
      xs: "max-w-sm",
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-xl",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
      "8xl": "max-w-8xl",
      "9xl": "max-w-9xl",
      full: "max-w-full",
    },
    xPadding: {
      4: "px-4",
      8: "px-8",
    },
  },
});
