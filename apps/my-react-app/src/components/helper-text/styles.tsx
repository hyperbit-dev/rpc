import { tv } from "tailwind-variants";

export const baseHelperText = tv({
  base: "mt-2",
  variants: {
    color: {
      default: ["text-gray-500 dark:text-gray-400"],
      success: ["text-green-600 dark:text-green-500"],
      error: ["text-red-600 dark:text-red-500"],
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
});