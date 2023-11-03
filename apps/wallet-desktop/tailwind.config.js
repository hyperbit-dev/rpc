/** @type {import('tailwindcss').Config} */
import { slipstream } from "@hyperbitui/theme";

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "../../node_modules/@hyperbitui/react/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@hyperbitui/theme/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    slipstream,
    require("@tailwindcss/forms"),
    require("tailwindcss-radix")()
  ],
};
