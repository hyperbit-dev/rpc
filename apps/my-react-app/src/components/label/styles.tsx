import { tv } from "tailwind-variants";

export const baseLabel = tv({
  base: "block font-medium",
  variants: {
    color: {
      default: ["text-gray-100"],
      succcess: ["text-green-700"],
      error: ["text-red-600"],
    },
    spacing: {
      default: "mb-2",
      none: "",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    color: "default",
    spacing: "default",
    size: "md",
  }
});
