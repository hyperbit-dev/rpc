// vite.config.ts
import react from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { crx } from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import { resolve } from "node:path";
import { defineConfig, splitVendorChunkPlugin as vendor } from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/apps/extension/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/node_modules/vite-plugin-node-polyfills/dist/index.js";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Hyperbit",
  version: "1.0.0",
  action: { default_popup: "index.html" },
  content_scripts: [
    {
      js: ["src/main.tsx"],
      matches: ["https://google.com/*"]
    }
  ],
  side_panel: {
    default_path: "sidepanel.html"
  },
  permissions: ["sidePanel", "storage"]
};

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\MMCSH\\Documents\\Projects\\hyperbit\\apps\\extension";
var vite_config_default = defineConfig({
  plugins: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    react(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    crx({ manifest: manifest_default }),
    nodePolyfills(),
    vendor()
  ],
  resolve: {
    alias: [{ find: "~", replacement: resolve(__vite_injected_original_dirname, "./src") }]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1NQ1NIXFxcXERvY3VtZW50c1xcXFxQcm9qZWN0c1xcXFxoeXBlcmJpdFxcXFxhcHBzXFxcXGV4dGVuc2lvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTU1DU0hcXFxcRG9jdW1lbnRzXFxcXFByb2plY3RzXFxcXGh5cGVyYml0XFxcXGFwcHNcXFxcZXh0ZW5zaW9uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9NTUNTSC9Eb2N1bWVudHMvUHJvamVjdHMvaHlwZXJiaXQvYXBwcy9leHRlbnNpb24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBjcnggfSBmcm9tIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBzcGxpdFZlbmRvckNodW5rUGx1Z2luIGFzIHZlbmRvciB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSBcInZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzXCI7XG4vLyBOb2RlID49MTdcbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5qc29uXCIgYXNzZXJ0IHsgdHlwZTogXCJqc29uXCIgfTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHJlYWN0KCksXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICBjcngoeyBtYW5pZmVzdCB9KSxcbiAgICBub2RlUG9seWZpbGxzKCksXG4gICAgdmVuZG9yKCksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW3sgZmluZDogXCJ+XCIsIHJlcGxhY2VtZW50OiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSB9XSxcbiAgfSxcbn0pO1xuIiwgIntcclxuICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcclxuICBcIm5hbWVcIjogXCJIeXBlcmJpdFwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXHJcbiAgXCJhY3Rpb25cIjogeyBcImRlZmF1bHRfcG9wdXBcIjogXCJpbmRleC5odG1sXCIgfSxcclxuICAgIFwiY29udGVudF9zY3JpcHRzXCI6IFtcclxuICAgIHtcclxuICAgICAgXCJqc1wiOiBbXCJzcmMvbWFpbi50c3hcIl0sXHJcbiAgICAgIFwibWF0Y2hlc1wiOiBbXCJodHRwczovL2dvb2dsZS5jb20vKlwiXVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgXCJzaWRlX3BhbmVsXCI6IHtcclxuICAgIFwiZGVmYXVsdF9wYXRoXCI6IFwic2lkZXBhbmVsLmh0bWxcIlxyXG4gIH0sXHJcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXCJzaWRlUGFuZWxcIiwgXCJzdG9yYWdlXCJdXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VyxPQUFPLFdBQVc7QUFDL1gsU0FBUyxXQUFXO0FBQ3BCLFNBQVMsZUFBZTtBQUN4QixTQUFTLGNBQWMsMEJBQTBCLGNBQWM7QUFDL0QsU0FBUyxxQkFBcUI7OztBQ0o5QjtBQUFBLEVBQ0Usa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsUUFBVSxFQUFFLGVBQWlCLGFBQWE7QUFBQSxFQUN4QyxpQkFBbUI7QUFBQSxJQUNuQjtBQUFBLE1BQ0UsSUFBTSxDQUFDLGNBQWM7QUFBQSxNQUNyQixTQUFXLENBQUMsc0JBQXNCO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxZQUFjO0FBQUEsSUFDWixjQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxhQUFlLENBQUMsYUFBYSxTQUFTO0FBQ3hDOzs7QURmQSxJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUE7QUFBQTtBQUFBLElBR1AsTUFBTTtBQUFBO0FBQUE7QUFBQSxJQUdOLElBQUksRUFBRSwyQkFBUyxDQUFDO0FBQUEsSUFDaEIsY0FBYztBQUFBLElBQ2QsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU8sQ0FBQyxFQUFFLE1BQU0sS0FBSyxhQUFhLFFBQVEsa0NBQVcsT0FBTyxFQUFFLENBQUM7QUFBQSxFQUNqRTtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
