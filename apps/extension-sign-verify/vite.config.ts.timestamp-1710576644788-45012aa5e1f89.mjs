// vite.config.ts
import { defineConfig } from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/apps/extension-sign-verify/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { crx } from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import react from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/node_modules/@vitejs/plugin-react/dist/index.mjs";

// src/manifest.ts
import { defineManifest } from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  name: "@hyperbit/message",
  displayName: "Hyperbit Message",
  version: "0.0.0",
  author: "Hyperbit",
  description: "",
  type: "module",
  license: "MIT",
  keywords: [
    "chrome-extension",
    "react",
    "vite",
    "create-chrome-ext"
  ],
  engines: {
    node: ">=14.18.0"
  },
  scripts: {
    dev: "vite",
    build: "tsc && vite build",
    preview: "vite preview",
    fmt: "prettier --write '**/*.{tsx,ts,json,css,scss,md}'"
  },
  dependencies: {
    "@hyperbitjs/chains": "^1.3.3",
    "@hyperbitjs/message": "^1.0.0",
    "@hyperbitjs/mnemonic": "^2.0.0",
    "@hyperbitui/react": "*",
    "@hyperbitui/theme": "*",
    "@rollup/plugin-replace": "^5.0.5",
    clsx: "^2.1.0",
    dotenv: "^16.4.1",
    react: "18.2.0",
    "react-dom": "18.2.0",
    "react-router-dom": "^6.21.3",
    "vite-plugin-node-polyfills": "^0.19.0"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.19",
    "@types/chrome": "^0.0.246",
    "@types/react": "^18.2.28",
    "@types/react-dom": "^18.2.13",
    "@vitejs/plugin-react": "^4.1.0",
    autoprefixer: "^10.4.17",
    postcss: "^8.4.33",
    prettier: "^3.0.3",
    tailwindcss: "^3.4.1",
    typescript: "^5.2.2",
    vite: "^4.4.11"
  }
};

// src/manifest.ts
var manifest_default = defineManifest({
  name: package_default.name,
  description: package_default.description,
  version: package_default.version,
  manifest_version: 3,
  icons: {
    16: "img/logo-16.png",
    32: "img/logo-34.png",
    48: "img/logo-48.png",
    128: "img/logo-128.png"
  },
  action: {
    default_popup: "popup.html",
    default_icon: "img/logo-48.png"
  },
  // options_page: 'options.html',
  // devtools_page: 'devtools.html',
  // background: {
  //   service_worker: 'src/background/index.ts',
  //   type: 'module',
  // },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/contentScript/index.ts"]
    }
  ],
  side_panel: {
    default_path: "sidepanel.html"
  },
  web_accessible_resources: [
    {
      resources: ["img/logo-16.png", "img/logo-34.png", "img/logo-48.png", "img/logo-128.png"],
      matches: []
    }
  ],
  permissions: ["sidePanel", "storage"]
});

// vite.config.ts
var vite_config_default = defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/chunk-[hash].js"
        }
      }
    },
    plugins: [
      crx({ manifest: manifest_default }),
      react(),
      nodePolyfills()
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1NQ1NIXFxcXERvY3VtZW50c1xcXFxQcm9qZWN0c1xcXFxoeXBlcmJpdFxcXFxhcHBzXFxcXGV4dGVuc2lvbi1zaWduLXZlcmlmeVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTU1DU0hcXFxcRG9jdW1lbnRzXFxcXFByb2plY3RzXFxcXGh5cGVyYml0XFxcXGFwcHNcXFxcZXh0ZW5zaW9uLXNpZ24tdmVyaWZ5XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9NTUNTSC9Eb2N1bWVudHMvUHJvamVjdHMvaHlwZXJiaXQvYXBwcy9leHRlbnNpb24tc2lnbi12ZXJpZnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gJ3ZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzJ1xuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9zcmMvbWFuaWZlc3QnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgYnVpbGQ6IHtcbiAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgICAgb3V0RGlyOiAnYnVpbGQnLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9jaHVuay1baGFzaF0uanMnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgcGx1Z2luczogW1xuICAgICAgY3J4KHsgbWFuaWZlc3QgfSksXG4gICAgICByZWFjdCgpLFxuICAgICAgbm9kZVBvbHlmaWxscygpLFxuICAgIF0sXG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1NQ1NIXFxcXERvY3VtZW50c1xcXFxQcm9qZWN0c1xcXFxoeXBlcmJpdFxcXFxhcHBzXFxcXGV4dGVuc2lvbi1zaWduLXZlcmlmeVxcXFxzcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1NQ1NIXFxcXERvY3VtZW50c1xcXFxQcm9qZWN0c1xcXFxoeXBlcmJpdFxcXFxhcHBzXFxcXGV4dGVuc2lvbi1zaWduLXZlcmlmeVxcXFxzcmNcXFxcbWFuaWZlc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL01NQ1NIL0RvY3VtZW50cy9Qcm9qZWN0cy9oeXBlcmJpdC9hcHBzL2V4dGVuc2lvbi1zaWduLXZlcmlmeS9zcmMvbWFuaWZlc3QudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCBwYWNrYWdlRGF0YSBmcm9tICcuLi9wYWNrYWdlLmpzb24nXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZU1hbmlmZXN0KHtcbiAgbmFtZTogcGFja2FnZURhdGEubmFtZSxcbiAgZGVzY3JpcHRpb246IHBhY2thZ2VEYXRhLmRlc2NyaXB0aW9uLFxuICB2ZXJzaW9uOiBwYWNrYWdlRGF0YS52ZXJzaW9uLFxuICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxuICBpY29uczoge1xuICAgIDE2OiAnaW1nL2xvZ28tMTYucG5nJyxcbiAgICAzMjogJ2ltZy9sb2dvLTM0LnBuZycsXG4gICAgNDg6ICdpbWcvbG9nby00OC5wbmcnLFxuICAgIDEyODogJ2ltZy9sb2dvLTEyOC5wbmcnLFxuICB9LFxuICBhY3Rpb246IHtcbiAgICBkZWZhdWx0X3BvcHVwOiAncG9wdXAuaHRtbCcsXG4gICAgZGVmYXVsdF9pY29uOiAnaW1nL2xvZ28tNDgucG5nJyxcbiAgfSxcbiAgLy8gb3B0aW9uc19wYWdlOiAnb3B0aW9ucy5odG1sJyxcbiAgLy8gZGV2dG9vbHNfcGFnZTogJ2RldnRvb2xzLmh0bWwnLFxuICAvLyBiYWNrZ3JvdW5kOiB7XG4gIC8vICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9pbmRleC50cycsXG4gIC8vICAgdHlwZTogJ21vZHVsZScsXG4gIC8vIH0sXG4gIGNvbnRlbnRfc2NyaXB0czogW1xuICAgIHtcbiAgICAgIG1hdGNoZXM6IFsnaHR0cDovLyovKicsICdodHRwczovLyovKiddLFxuICAgICAganM6IFsnc3JjL2NvbnRlbnRTY3JpcHQvaW5kZXgudHMnXSxcbiAgICB9LFxuICBdLFxuICBzaWRlX3BhbmVsOiB7XG4gICAgZGVmYXVsdF9wYXRoOiAnc2lkZXBhbmVsLmh0bWwnLFxuICB9LFxuICB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcbiAgICB7XG4gICAgICByZXNvdXJjZXM6IFsnaW1nL2xvZ28tMTYucG5nJywgJ2ltZy9sb2dvLTM0LnBuZycsICdpbWcvbG9nby00OC5wbmcnLCAnaW1nL2xvZ28tMTI4LnBuZyddLFxuICAgICAgbWF0Y2hlczogW10sXG4gICAgfSxcbiAgXSxcbiAgcGVybWlzc2lvbnM6IFsnc2lkZVBhbmVsJywgJ3N0b3JhZ2UnXSxcbn0pXG4iLCAie1xuICBcIm5hbWVcIjogXCJAaHlwZXJiaXQvbWVzc2FnZVwiLFxuICBcImRpc3BsYXlOYW1lXCI6IFwiSHlwZXJiaXQgTWVzc2FnZVwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMFwiLFxuICBcImF1dGhvclwiOiBcIkh5cGVyYml0XCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImNocm9tZS1leHRlbnNpb25cIixcbiAgICBcInJlYWN0XCIsXG4gICAgXCJ2aXRlXCIsXG4gICAgXCJjcmVhdGUtY2hyb21lLWV4dFwiXG4gIF0sXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0xNC4xOC4wXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidHNjICYmIHZpdGUgYnVpbGRcIixcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcbiAgICBcImZtdFwiOiBcInByZXR0aWVyIC0td3JpdGUgJyoqLyoue3RzeCx0cyxqc29uLGNzcyxzY3NzLG1kfSdcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAaHlwZXJiaXRqcy9jaGFpbnNcIjogXCJeMS4zLjNcIixcbiAgICBcIkBoeXBlcmJpdGpzL21lc3NhZ2VcIjogXCJeMS4wLjBcIixcbiAgICBcIkBoeXBlcmJpdGpzL21uZW1vbmljXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJAaHlwZXJiaXR1aS9yZWFjdFwiOiBcIipcIixcbiAgICBcIkBoeXBlcmJpdHVpL3RoZW1lXCI6IFwiKlwiLFxuICAgIFwiQHJvbGx1cC9wbHVnaW4tcmVwbGFjZVwiOiBcIl41LjAuNVwiLFxuICAgIFwiY2xzeFwiOiBcIl4yLjEuMFwiLFxuICAgIFwiZG90ZW52XCI6IFwiXjE2LjQuMVwiLFxuICAgIFwicmVhY3RcIjogXCIxOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIjE4LjIuMFwiLFxuICAgIFwicmVhY3Qtcm91dGVyLWRvbVwiOiBcIl42LjIxLjNcIixcbiAgICBcInZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzXCI6IFwiXjAuMTkuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjcnhqcy92aXRlLXBsdWdpblwiOiBcIl4yLjAuMC1iZXRhLjE5XCIsXG4gICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yNDZcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4yLjI4XCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjIuMTNcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI6IFwiXjQuMS4wXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xN1wiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzNcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMC4zXCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjQuMVwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjIuMlwiLFxuICAgIFwidml0ZVwiOiBcIl40LjQuMTFcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlaLFNBQVMsb0JBQW9CO0FBQzlhLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsV0FBVztBQUNwQixPQUFPLFdBQVc7OztBQ0h1WSxTQUFTLHNCQUFzQjs7O0FDQXhiO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsRUFDWCxRQUFVO0FBQUEsRUFDVixhQUFlO0FBQUEsRUFDZixNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxVQUFZO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxTQUFXO0FBQUEsSUFDWCxLQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxJQUNkLHNCQUFzQjtBQUFBLElBQ3RCLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLDBCQUEwQjtBQUFBLElBQzFCLE1BQVE7QUFBQSxJQUNSLFFBQVU7QUFBQSxJQUNWLE9BQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLDhCQUE4QjtBQUFBLEVBQ2hDO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQixzQkFBc0I7QUFBQSxJQUN0QixpQkFBaUI7QUFBQSxJQUNqQixnQkFBZ0I7QUFBQSxJQUNoQixvQkFBb0I7QUFBQSxJQUNwQix3QkFBd0I7QUFBQSxJQUN4QixjQUFnQjtBQUFBLElBQ2hCLFNBQVc7QUFBQSxJQUNYLFVBQVk7QUFBQSxJQUNaLGFBQWU7QUFBQSxJQUNmLFlBQWM7QUFBQSxJQUNkLE1BQVE7QUFBQSxFQUNWO0FBQ0Y7OztBRC9DQSxJQUFPLG1CQUFRLGVBQWU7QUFBQSxFQUM1QixNQUFNLGdCQUFZO0FBQUEsRUFDbEIsYUFBYSxnQkFBWTtBQUFBLEVBQ3pCLFNBQVMsZ0JBQVk7QUFBQSxFQUNyQixrQkFBa0I7QUFBQSxFQUNsQixPQUFPO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixLQUFLO0FBQUEsRUFDUDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLEVBQ2hCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPQSxpQkFBaUI7QUFBQSxJQUNmO0FBQUEsTUFDRSxTQUFTLENBQUMsY0FBYyxhQUFhO0FBQUEsTUFDckMsSUFBSSxDQUFDLDRCQUE0QjtBQUFBLElBQ25DO0FBQUEsRUFDRjtBQUFBLEVBQ0EsWUFBWTtBQUFBLElBQ1YsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSwwQkFBMEI7QUFBQSxJQUN4QjtBQUFBLE1BQ0UsV0FBVyxDQUFDLG1CQUFtQixtQkFBbUIsbUJBQW1CLGtCQUFrQjtBQUFBLE1BQ3ZGLFNBQVMsQ0FBQztBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFDQSxhQUFhLENBQUMsYUFBYSxTQUFTO0FBQ3RDLENBQUM7OztBRGhDRCxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxTQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDTCxhQUFhO0FBQUEsTUFDYixRQUFRO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxJQUFJLEVBQUUsMkJBQVMsQ0FBQztBQUFBLE1BQ2hCLE1BQU07QUFBQSxNQUNOLGNBQWM7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
