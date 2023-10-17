/** @type {import('tailwindcss').Config} */
import { slipstream } from "@slipstreamui/theme";
import forms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.{js,jsx,tx,tsx,css}"],
  theme: {},
  plugins: [forms({ strategy: "class" }), slipstream],
};
