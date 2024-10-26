import localFont from "next/font/local";

const tasaOrbiter = localFont({
  variable: "--font-tasa-orbiter",
  src: [
    {
      path: "../public/fonts/TasaOrbiter-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TasaOrbiter-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/TasaOrbiter-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/TasaOrbiter-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

const tahoma = localFont({
  variable: "--font-tahoma",
  src: [
    {
      path: "../public/fonts/Tahoma-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    { path: "../public/fonts/Tahoma-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const circular = localFont({
  variable: "--font-circular",
  src: [
    {
      path: "../public/fonts/Circular-Light.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Circular-Regular.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Circular-Medium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Circular-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export { tasaOrbiter, tahoma, circular };
