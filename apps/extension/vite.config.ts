import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import { resolve } from "node:path";
import { defineConfig, splitVendorChunkPlugin as vendor } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// Node >=17
import manifest from "./manifest.json" assert { type: "json" };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    react(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    crx({ manifest }),
    nodePolyfills(),
    vendor(),
  ],
  resolve: {
    alias: [{ find: "~", replacement: resolve(__dirname, "./src") }],
  },
});
