import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { DB_URL } from "./connection-factory";
import { drizzle } from "drizzle-orm/postgres-js";

const migrationClient = postgres(DB_URL, { max: 1 });
migrate(drizzle(migrationClient), {
  migrationsFolder: "./src/core/db/migrations",
}).then(
  () => {
    console.log("Migration complete");
    process.exit(0);
  },
  (err) => {
    console.error("Migration failed", err);
    process.exit(1);
  },
);
