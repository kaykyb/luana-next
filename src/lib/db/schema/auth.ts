import { pgSchema, uuid } from "drizzle-orm/pg-core";

// Internal Supabase schemas
export const authSchema = pgSchema("auth");

export const authUsers = authSchema.table("users", {
  id: uuid("id").notNull(),
});
