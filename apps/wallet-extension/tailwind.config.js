/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import { slipstream } from "@slipstreamui/theme";

module.exports = {
  content: [
    "../../node_modules/@slipstreamui/react/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@slipstreamui/theme/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  darkMode: "class",
  plugins: [slipstream()],
};
