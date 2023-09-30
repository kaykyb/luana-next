import { integer, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { privateSchema } from "./privateSchema";
import { quizSessions } from "./quizSession";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const prompts = privateSchema.table("prompts", {
  id: uuid("id").defaultRandom().primaryKey(),
  quizSessionId: uuid("quiz_session_id")
    .notNull()
    .references(() => quizSessions.id),
  question: text("question").notNull(),
  position: integer("position").notNull(),
  answer: text("answer"),
  createdAt: timestamp("created_at").defaultNow(),
});

const prompt = createSelectSchema(prompts);
export type Prompt = z.infer<typeof prompt>;
