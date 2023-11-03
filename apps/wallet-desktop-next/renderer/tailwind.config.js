import { slipstream } from "@hyperbitui/theme";

module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@hyperbitui/react/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@hyperbitui/theme/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [slipstream, require("@tailwindcss/forms")],
};
