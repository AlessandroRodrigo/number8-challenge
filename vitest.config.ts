import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      DATABASE_URL: "mysql://user:1234@localhost:3306/mydatabase",
    },
  },
});
