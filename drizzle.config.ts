import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/repositories/drizzle/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ["*"],
} satisfies Config;
