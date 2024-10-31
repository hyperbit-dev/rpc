/** @type {import('tailwindcss').Config} */
import { slipstream } from "@hyperbit-private/theme";

module.exports = {
  content: [
    "./_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./_containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/@hyperbit-private/react/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@hyperbit-private/theme/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontfamily: {
        workSans: ["var(--font-work-sans)"],
        monumentGrotesk: ["var(--font-monument-grotesk)"],
        // tasaOrbiter: ["var(--font-tasa-orbiter)"],
        // tahoma: ["var(--font-tahoma)"],
        // circular: ["var(--font-circular)"],
      },
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
      flex: {
        2: "2 2 0%",
        4: "4 4 0%",
      },
    },
  },
  plugins: [
    slipstream,
    require("@tailwindcss/forms"),
    require("tailwindcss-radix")(),
  ],
};
