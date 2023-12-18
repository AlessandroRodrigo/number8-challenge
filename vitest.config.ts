import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    env: {
      DATABASE_URL: "mysql://user:password@localhost:3306/dbname",
    },
    alias: {
      "~": "src",
    },
  },
});
