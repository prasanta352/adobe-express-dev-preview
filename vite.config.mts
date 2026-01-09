import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  root: "web",
  server: {
    open: "index.html",
  },
  publicDir: "./src/assets",
  define: {
    // API_KEY: JSON.stringify(process.env.API_KEY),
  },
  resolve: {
    alias: {},
  },
});
