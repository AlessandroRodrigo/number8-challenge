import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    env: {
      DATABASE_URL: "mysql://user:1234@localhost:3306/mydatabase",
    },
    alias: {
      "~": "src",
    },
  },
});