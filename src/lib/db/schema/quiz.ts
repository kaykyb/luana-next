import { integer, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { privateSchema } from "./privateSchema";
import { profiles } from "./profile";
import { createSelectSchema } from "drizzle-zod";

import { z } from "zod";

export const quizzes = privateSchema.table("quizzes", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id),
  leadingPrompt: text("leading_prompt").notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  maxPrompts: integer("max_prompts").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

const quizSchema = createSelectSchema(quizzes);
export type Quiz = z.infer<typeof quizSchema>;
