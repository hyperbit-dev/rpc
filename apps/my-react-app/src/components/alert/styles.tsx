import { tv } from "tailwind-variants";

export const baseAlert = tv({
  base: "p-4 text-sm rounded-lg border",
  variants: {
    color: {
      default: ["text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 border-gray-300"],
      info: ["text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 border-blue-300"],
      danger: ["text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400 border-red-300"],
      success: [
        "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400 border-green-300",
      ],
      warning: [
        "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 border-yellow-300",
      ],
    },
  },
});
