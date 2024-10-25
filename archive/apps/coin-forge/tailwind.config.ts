/** @type {import('tailwindcss').Config} */
import { slipstream } from "@hyperbit-private/theme";

module.exports = {
  content: [
    "./**/*.{ts,tsx}",
    "../../node_modules/@hyperbit-private/react/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@hyperbit-private/theme/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        avenir: ["var(--font-avenir)"],
        "avenir-medium": ["var(--font-avenir-medium)"],
        "avenir-bold": ["var(--font-avenir-bold)"],
      },
      colors: {
        brand: {
          50: "#C1E8FE",
          100: "#ADE0FE",
          200: "#84D1FE",
          300: "#5CC2FE",
          400: "#33B2FD",
          500: "#0BA3FD",
          600: "#0282CE",
          700: "#015F97",
          800: "#013C5F",
          900: "#001927",
          950: "#00070B",
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
