// vite.config.ts
import { defineConfig } from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/apps/extension-wallet/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { crx } from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import react from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/node_modules/@vitejs/plugin-react/dist/index.mjs";

// src/manifest.ts
import { defineManifest } from "file:///C:/Users/MMCSH/Documents/Projects/hyperbit/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  name: "@hyperbit/wallet-extension",
  displayName: "Hyperbit Wallet",
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
    "@hyperbitjs-private/wallet": "*",
    "@hyperbitjs/chains": "^1.3.3",
    "@hyperbitjs/message": "^1.0.0",
    "@hyperbitjs/mnemonic": "^2.1.3",
    "@hyperbitui/react": "*",
    "@hyperbitui/theme": "*",
    "@rollup/plugin-replace": "^5.0.5",
    clsx: "^2.1.0",
    dotenv: "^16.4.1",
    react: "18.2.0",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.50.1",
    "react-router-dom": "^6.21.3",
    "vite-plugin-node-polyfills": "^0.19.0",
    zod: "^3.22.4"
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
      react({
        include: "**/*.tsx"
      }),
      nodePolyfills()
    ],
    server: {
      watch: {
        usePolling: true
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1NQ1NIXFxcXERvY3VtZW50c1xcXFxQcm9qZWN0c1xcXFxoeXBlcmJpdFxcXFxhcHBzXFxcXGV4dGVuc2lvbi13YWxsZXRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1NQ1NIXFxcXERvY3VtZW50c1xcXFxQcm9qZWN0c1xcXFxoeXBlcmJpdFxcXFxhcHBzXFxcXGV4dGVuc2lvbi13YWxsZXRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL01NQ1NIL0RvY3VtZW50cy9Qcm9qZWN0cy9oeXBlcmJpdC9hcHBzL2V4dGVuc2lvbi13YWxsZXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gJ3ZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzJ1xuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9zcmMvbWFuaWZlc3QnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgYnVpbGQ6IHtcbiAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgICAgb3V0RGlyOiAnYnVpbGQnLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9jaHVuay1baGFzaF0uanMnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgcGx1Z2luczogW1xuICAgICAgY3J4KHsgbWFuaWZlc3QgfSksXG4gICAgICByZWFjdCh7XG4gICAgICAgIGluY2x1ZGU6ICcqKi8qLnRzeCcsXG4gICAgICB9KSxcbiAgICAgIG5vZGVQb2x5ZmlsbHMoKSxcbiAgICBdLFxuXG4gICAgc2VydmVyOiB7XG4gICAgICB3YXRjaDoge1xuICAgICAgICB1c2VQb2xsaW5nOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9XG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxNTUNTSFxcXFxEb2N1bWVudHNcXFxcUHJvamVjdHNcXFxcaHlwZXJiaXRcXFxcYXBwc1xcXFxleHRlbnNpb24td2FsbGV0XFxcXHNyY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTU1DU0hcXFxcRG9jdW1lbnRzXFxcXFByb2plY3RzXFxcXGh5cGVyYml0XFxcXGFwcHNcXFxcZXh0ZW5zaW9uLXdhbGxldFxcXFxzcmNcXFxcbWFuaWZlc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL01NQ1NIL0RvY3VtZW50cy9Qcm9qZWN0cy9oeXBlcmJpdC9hcHBzL2V4dGVuc2lvbi13YWxsZXQvc3JjL21hbmlmZXN0LnRzXCI7aW1wb3J0IHsgZGVmaW5lTWFuaWZlc3QgfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5pbXBvcnQgcGFja2FnZURhdGEgZnJvbSAnLi4vcGFja2FnZS5qc29uJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdCh7XG4gIG5hbWU6IHBhY2thZ2VEYXRhLm5hbWUsXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlRGF0YS5kZXNjcmlwdGlvbixcbiAgdmVyc2lvbjogcGFja2FnZURhdGEudmVyc2lvbixcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcbiAgaWNvbnM6IHtcbiAgICAxNjogJ2ltZy9sb2dvLTE2LnBuZycsXG4gICAgMzI6ICdpbWcvbG9nby0zNC5wbmcnLFxuICAgIDQ4OiAnaW1nL2xvZ28tNDgucG5nJyxcbiAgICAxMjg6ICdpbWcvbG9nby0xMjgucG5nJyxcbiAgfSxcbiAgYWN0aW9uOiB7XG4gICAgZGVmYXVsdF9wb3B1cDogJ3BvcHVwLmh0bWwnLFxuICAgIGRlZmF1bHRfaWNvbjogJ2ltZy9sb2dvLTQ4LnBuZycsXG4gIH0sXG4gIC8vIG9wdGlvbnNfcGFnZTogJ29wdGlvbnMuaHRtbCcsXG4gIC8vIGRldnRvb2xzX3BhZ2U6ICdkZXZ0b29scy5odG1sJyxcbiAgLy8gYmFja2dyb3VuZDoge1xuICAvLyAgIHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQvaW5kZXgudHMnLFxuICAvLyAgIHR5cGU6ICdtb2R1bGUnLFxuICAvLyB9LFxuICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbJ2h0dHA6Ly8qLyonLCAnaHR0cHM6Ly8qLyonXSxcbiAgICAgIGpzOiBbJ3NyYy9jb250ZW50U2NyaXB0L2luZGV4LnRzJ10sXG4gICAgfSxcbiAgXSxcbiAgc2lkZV9wYW5lbDoge1xuICAgIGRlZmF1bHRfcGF0aDogJ3NpZGVwYW5lbC5odG1sJyxcbiAgfSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbJ2ltZy9sb2dvLTE2LnBuZycsICdpbWcvbG9nby0zNC5wbmcnLCAnaW1nL2xvZ28tNDgucG5nJywgJ2ltZy9sb2dvLTEyOC5wbmcnXSxcbiAgICAgIG1hdGNoZXM6IFtdLFxuICAgIH0sXG4gIF0sXG4gIHBlcm1pc3Npb25zOiBbJ3NpZGVQYW5lbCcsICdzdG9yYWdlJ10sXG59KVxuIiwgIntcbiAgXCJuYW1lXCI6IFwiQGh5cGVyYml0L3dhbGxldC1leHRlbnNpb25cIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIkh5cGVyYml0IFdhbGxldFwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMFwiLFxuICBcImF1dGhvclwiOiBcIkh5cGVyYml0XCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImNocm9tZS1leHRlbnNpb25cIixcbiAgICBcInJlYWN0XCIsXG4gICAgXCJ2aXRlXCIsXG4gICAgXCJjcmVhdGUtY2hyb21lLWV4dFwiXG4gIF0sXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0xNC4xOC4wXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidHNjICYmIHZpdGUgYnVpbGRcIixcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcbiAgICBcImZtdFwiOiBcInByZXR0aWVyIC0td3JpdGUgJyoqLyoue3RzeCx0cyxqc29uLGNzcyxzY3NzLG1kfSdcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAaHlwZXJiaXRqcy1wcml2YXRlL3dhbGxldFwiOiBcIipcIixcbiAgICBcIkBoeXBlcmJpdGpzL2NoYWluc1wiOiBcIl4xLjMuM1wiLFxuICAgIFwiQGh5cGVyYml0anMvbWVzc2FnZVwiOiBcIl4xLjAuMFwiLFxuICAgIFwiQGh5cGVyYml0anMvbW5lbW9uaWNcIjogXCJeMi4xLjNcIixcbiAgICBcIkBoeXBlcmJpdHVpL3JlYWN0XCI6IFwiKlwiLFxuICAgIFwiQGh5cGVyYml0dWkvdGhlbWVcIjogXCIqXCIsXG4gICAgXCJAcm9sbHVwL3BsdWdpbi1yZXBsYWNlXCI6IFwiXjUuMC41XCIsXG4gICAgXCJjbHN4XCI6IFwiXjIuMS4wXCIsXG4gICAgXCJkb3RlbnZcIjogXCJeMTYuNC4xXCIsXG4gICAgXCJyZWFjdFwiOiBcIjE4LjIuMFwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiMTguMi4wXCIsXG4gICAgXCJyZWFjdC1ob29rLWZvcm1cIjogXCJeNy41MC4xXCIsXG4gICAgXCJyZWFjdC1yb3V0ZXItZG9tXCI6IFwiXjYuMjEuM1wiLFxuICAgIFwidml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHNcIjogXCJeMC4xOS4wXCIsXG4gICAgXCJ6b2RcIjogXCJeMy4yMi40XCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiXjIuMC4wLWJldGEuMTlcIixcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI0NlwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuMjhcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMi4xM1wiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4xLjBcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE3XCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4zM1wiLFxuICAgIFwicHJldHRpZXJcIjogXCJeMy4wLjNcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuNC4xXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMi4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuNC4xMVwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1ksU0FBUyxvQkFBb0I7QUFDL1osU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxXQUFXO0FBQ3BCLE9BQU8sV0FBVzs7O0FDSHdYLFNBQVMsc0JBQXNCOzs7QUNBemE7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLGFBQWU7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
