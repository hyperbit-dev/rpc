/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        // secondary: {
        //   50: "#e8e9ea",
        //   100: "#d2d3d5",
        //   200: "#a5a6ac",
        //   300: "#777a82",
        //   400: "#4a4d59",
        //   500: "#1d212f",
        //   600: "#171a26",
        //   700: "#11141c",
        //   800: "#0c0d13",
        //   900: "#060709",
        // },
        secondary: {
          50: "#e8e8e9",
          100: "#d1d2d2",
          200: "#a3a4a5",
          300: "#767778",
          400: "#48494b",
          500: "#1a1c1e",
          600: "#151618",
          700: "#101112",
          800: "#0a0b0c",
          900: "#050606",
        },
      },
      keyframes: {
        hide: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        dialogOverlayShow: {
          from: { opacity: "0", transform: "opacity-0" },
          to: { opacity: "1", transform: "opacity-1" },
        },
        drawerSlideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(100%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        drawerSlideRightAndFade: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(100%)" },
        },
      },
      animation: {
        hide: "hide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        // Drawer
        dialogOverlayShow: "dialogOverlayShow .15s cubic-bezier(.16,1,.3,1)",
        drawerSlideLeftAndFade:
          "drawerSlideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        drawerSlideRightAndFade: "drawerSlideRightAndFade 150ms ease-in",
      },
    },
  },
  plugins: [],
};
