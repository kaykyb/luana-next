import { timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { privateSchema } from "./privateSchema";
import { authUsers } from "./auth";

export const profiles = privateSchema.table("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() => authUsers.id, {
      onDelete: "cascade",
    }),
  name: varchar("name", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow(),
});
