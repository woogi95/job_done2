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
        target: "https://job-done.r-e.kr:52340",
        changeOrigin: true,
        secure: false,
      },
      "/chat": {
        target: "wss://job-done.r-e.kr:52340",
        changeOrigin: true,
        secure: false,
        ws: true,
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
