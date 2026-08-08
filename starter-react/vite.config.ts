import { defineConfig, lazyPlugins } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(async () => ({
  plugins: lazyPlugins(() => [tailwindcss(), react()]),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  lint: {
    ignorePatterns: ["dist/**", "public/**", "*.config.ts"],
  },
  staged: {
    "src/**/*.{js,ts,tsx}": "vp check --fix",
  },
}));
