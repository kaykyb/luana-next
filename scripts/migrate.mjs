import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const runMigrations = async () => {
  const connectionString = process.env.DATABASE_URL;
  const client = postgres(connectionString);
  const db = drizzle(client);

  try {
    await migrate(db, { migrationsFolder: "drizzle" });

    console.log("Migrated DB.");
    process.exit(0);
  } catch {
    console.error("Failed to migrate DB.");
    process.exit(1);
  }
};

runMigrations();
