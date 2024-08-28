import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": "/src",
      "@/components": "/src/components",
      "@/assets": "/src/assets",
      "@/constants": "/src/constants",
      "@/hooks": "/src/hooks",
      "@/layout": "/src/layout",
      "@/helpers": "/src/helpers",
      "@/common": "/src/common",
      "@/redux": "/src/redux",
    },
  },
});
