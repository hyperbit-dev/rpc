import localFont from "next/font/local";

const workSans = localFont({
  variable: "--font-work-sans",
  src: [
    {
      path: "./fonts/WorkSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

// const monumentGrotesk = localFont({
//   variable: "--font-monument-grotesk",
//   src: [
//     {
//       path: "./fonts/MonumentGrotesk-Regular.otf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/MonumentGrotesk-Medium.otf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "./fonts/MonumentGrotesk-Semi-Mono.otf",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "./fonts/MonumentGrotesk-Bold.otf",
//       weight: "700",
//       style: "normal",
//     },
//   ],
// });

// const tasaOrbiter = localFont({
//   variable: "--font-tasa-orbiter",
//   src: [
//     {
//       path: "./fonts/TasaOrbiter-Regular.otf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/TasaOrbiter-Medium.otf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "./fonts/TasaOrbiter-SemiBold.otf",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "./fonts/TasaOrbiter-Bold.otf",
//       weight: "700",
//       style: "normal",
//     },
//   ],
// });

// const tahoma = localFont({
//   variable: "--font-tahoma",
//   src: [
//     {
//       path: "./fonts/Tahoma-Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     { path: "./fonts/Tahoma-Bold.ttf", weight: "700", style: "normal" },
//   ],
// });

// const circular = localFont({
//   variable: "--font-circular",
//   src: [
//     {
//       path: "./fonts/Circular-Light.otf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/Circular-Book.otf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "./fonts/Circular-Medium.otf",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "./fonts/Circular-Bold.otf",
//       weight: "700",
//       style: "normal",
//     },
//   ],
// });

export { workSans };
