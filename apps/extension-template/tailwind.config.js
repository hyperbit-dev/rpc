/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
import plugin from "tailwindcss/plugin";

module.exports = {
  content: [
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff9f2",
          100: "#dff4e5",
          200: "#bfe9cb",
          300: "#9fddb2",
          400: "#7fd298",
          500: "#5fc77e",
          600: "#4c9f65",
          700: "#39774c",
          800: "#265032",
          900: "#132819",
        },
        secondary: {
          50: "#e8e9ea",
          100: "#d2d3d5",
          200: "#a5a6ac",
          300: "#777a82",
          400: "#4a4d59",
          500: "#1d212f",
          600: "#171a26",
          700: "#11141c",
          800: "#0c0d13",
          900: "#060709",
        },
      },
      fontFamily: {
        brand: ['"Open Sans"', "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    plugin(function ({ addVariant }) {
      addVariant("action", ["&:hover", "&:active", "&:focus"]);
    }),
  ],
};
