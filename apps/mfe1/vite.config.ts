import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "http://localhost:4173/",
  plugins: [react()],
  define: {
    "process.env": {
      NODE_ENV: "production",
    },
  },
  build: {
    manifest: true,
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/client.tsx"),
      name: "mfe1",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "react",
          reactDom: "react-dom",
        },
      },
    },
  },
});
