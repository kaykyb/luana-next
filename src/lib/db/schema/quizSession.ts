import { text, timestamp, uuid } from "drizzle-orm/pg-core";
import { privateSchema } from "./privateSchema";
import { quizzes } from "./quiz";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const quizSessions = privateSchema.table("quiz_session", {
  id: uuid("id").defaultRandom().primaryKey(),
  quizId: uuid("quiz_id")
    .notNull()
    .references(() => quizzes.id),
  conclusion: text("conclusion"),
  createdAt: timestamp("created_at").defaultNow(),
});

const quizSessionSchema = createSelectSchema(quizSessions);
export type QuizSession = z.infer<typeof quizSessionSchema>;
