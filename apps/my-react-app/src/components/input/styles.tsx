import { tv } from "tailwind-variants";

export const baseInput = tv({
  base: "block w-full border rounded-lg outline-none",
  variants: {
    color: {
      default: [
        "text-gray-100 bg-secondary-500",
        "placeholder-gray-400 border-gray-600 focus:border-blue-500",
        "focus:ring-blue-500 dark:focus:ring-blue-500 ",
      ],
      success: [
        "text-green-500 bg-green-700/10 placeholder-green-400",
        "border-green-600 focus:border-green-500 focus:ring-green-500 ",
      ],
      error: [
        "text-red-500 bg-red-700/10 placeholder-red-400",
        "border-red-600 focus:border-red-500 focus:ring-red-500 ",
      ],
    },
    size: {
      sm: "text-xs p-2",
      md: "text-sm p-2.5",
      lg: "text-base p-4",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});
