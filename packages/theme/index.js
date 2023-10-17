const plugin = require("tailwindcss/plugin");

export const slipstream = plugin(
  function ({ addVariant }) {
    addVariant("action", ["&:hover", "&:active", "&:focus"]);
    addVariant("group-action", [
      ":merge(.group):hover &",
      ":merge(.group):active &",
      ":merge(.group):focus &",
    ]);
  },
  {
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
          brand: ['"Inter"', "sans-serif"],
        },
      },
    },
  }
);

export default slipstream;
