import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@interfaces": path.resolve(__dirname, "src/@interfaces"),
      "@config": path.resolve(__dirname, "src/config"),
      "@store": path.resolve(__dirname, "src/store"),
      "@services": path.resolve(__dirname, "src/services"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/styles/variables.scss" as *;`,
      },
    },
  },
});
