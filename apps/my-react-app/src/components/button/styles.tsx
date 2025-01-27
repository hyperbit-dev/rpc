import { tv } from "tailwind-variants";

export const baseButton = tv({
  base: "font-medium rounded-lg text-center inline-flex items-center justify-center duration-300",
  variants: {
    color: {
      default: [
        "text-gray-100 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
        "focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800",
        "disabled:bg-blue-400 disabled:dark:bg-blue-500",
      ],
      brand: [
        "text-gray-100 bg-brand-600 hover:bg-brand-700 dark:bg-brand-700 dark:hover:bg-brand-700",
        "focus:ring-4 focus:ring-brand-300 focus:outline-none dark:focus:ring-brand-700",
        "disabled:bg-brand-400 disabled:dark:bg-brand-600",
      ],
      link: [
        "text-gray-900 dark:text-gray-100 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 ",
        "focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700",
        "disabled:bg-gray-200 disabled:dark:bg-gray-700",
      ],
      light: [
        "border border-gray-300 dark:border-gray-60 dark:hover:border-gray-6000",
        "text-gray-900 dark:text-gray-100 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 ",
        "focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700",
        "disabled:bg-gray-200 disabled:dark:bg-gray-700",
      ],
      dark: [
        "text-gray-100 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800",
        "focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-800",
        "disabled:bg-gray-600 disabled:dark:bg-gray-700",
      ],
    },
    size: {
      xs: "text-xs px-3 py-2",
      sm: "text-sm px-3 py-2",
      md: "text-sm px-5 py-2.5",
      lg: "text-base px-5 py-3",
      xl: "text-base px-6 py-3.5",
    },
    width: {
      full: "w-full",
      auto: "w-auto",
    },
    disabled: {
      true: "cursor-not-allowed",
    },
    outline: {
      true: 'bg-red-500'
    }
  },
  compoundVariants: [
    {
      color: 'dark',
      outline: true,
      class: 'bg-transparent border border-gray-600 dark:border-gray-600 text-gray-200 dark:text-gray-200 hover:bg-gray-600 dark:hover:bg-gray-600'
    }
  ]
});
