import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), checker({ typescript: true })],
});
