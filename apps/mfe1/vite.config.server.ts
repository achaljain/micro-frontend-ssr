import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "http://localhost:4173/",
  plugins: [react()],
  build: {
    manifest: true,
    minify: false,
    ssr: true,
    ssrEmitAssets: true,
    assetsDir: 'assets'
  },
});
