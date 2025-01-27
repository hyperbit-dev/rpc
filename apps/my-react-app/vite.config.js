import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import replace from "@rollup/plugin-replace";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    TanStackRouterVite(),
    react(),
    nodePolyfills(),
    replace({
      "process.env": "import.meta.env",
    }),
  ],
  define: { "process.env": process.env, global: {} },
});
