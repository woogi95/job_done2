import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://112.222.157.157:5234",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // webSocket 연결을 위한 설정
  define: {
    global: "window",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@emotion/core": "@emotion/react",
    },
  },
});
