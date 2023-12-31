import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    env: {
      DATABASE_URL: "mysql://user:password@localhost:3306/dbname",
    },
    alias: {
      "~": "src",
    },
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
    globals: true,
  },
});
