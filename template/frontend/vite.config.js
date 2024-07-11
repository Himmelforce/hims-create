import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"

import { fileURLToPath, URL } from "node:url"

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true,
    port: process.env.FRONTEND_SERVICE_PORT,
    strictPort: true,
    watch: {
      usePolling: true
    },
    
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      $abstracts: fileURLToPath(new URL("./src/assets/styles", import.meta.url)),
      $animations: fileURLToPath(new URL("./src/animations", import.meta.url)),
      $assets: fileURLToPath(new URL("./src/assets", import.meta.url)),
      $components: fileURLToPath(new URL("./src/components", import.meta.url)),
      $contexts: fileURLToPath(new URL("./src/contexts", import.meta.url)),
      $icons: fileURLToPath(new URL("./src/assets/icons", import.meta.url)),
      $pages: fileURLToPath(new URL("./src/pages", import.meta.url)),
      $slices: fileURLToPath(new URL("./src/slices", import.meta.url)),
      $stores: fileURLToPath(new URL("./src/stores", import.meta.url)),
      $styles: fileURLToPath(new URL("./src/assets/styles", import.meta.url))
    }
  },
  define: {
    process: process
  },

})
