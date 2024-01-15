import { defineConfig } from "drizzle-kit";

const drizzleKitConfig = defineConfig({
  schema: "./src/core/db/schema.ts",
  out: "./src/core/db/migrations",
  driver: "pg",
});

export default drizzleKitConfig;
