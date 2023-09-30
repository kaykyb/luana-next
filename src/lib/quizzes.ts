import { eq } from "drizzle-orm";
import db from "./db/db";
import { Quiz, quizzes } from "./db/schema/quiz";

import { generateNextPrompt } from "./quiz/generator";
import { QuizSession, quizSessions } from "./db/schema/quizSession";
import { Prompt, prompts } from "./db/schema/prompt";

export const getQuiz = async (id: string): Promise<Quiz> => {
  const result = await db
    .select()
    .from(quizzes)
    .where(eq(quizzes.id, id))
    .limit(1);

  return result[0];
};

export const getQuizSession = async (id: string): Promise<QuizSession> => {
  const result = await db
    .select()
    .from(quizSessions)
    .where(eq(quizSessions.id, id))
    .limit(1);

  return result[0];
};

export const startQuizSession = async (quiz: Quiz): Promise<QuizSession> => {
  const result = await db
    .insert(quizSessions)
    .values({
      quizId: quiz.id,
    })
    .returning();

  return result[0];
};

export const getPromptsForQuizSession = async (
  session: QuizSession
): Promise<Prompt[]> => {
  const result = await db
    .select()
    .from(prompts)
    .where(eq(prompts.quizSessionId, session.id));

  return result;
};

type PushPromptResponse =
  | {
      type: "question";
      prompt: Prompt;
    }
  | {
      type: "conclusion";
      session: QuizSession;
    };

export const pushNextPromptForQuizSession = async (
  session: QuizSession
): Promise<PushPromptResponse> => {
  const quiz = await getQuiz(session.quizId);
  const previousPrompts = await getPromptsForQuizSession(session);
  const nextPrompt = await generateNextPrompt(quiz, previousPrompts);

  if (nextPrompt.type === "question") {
    const insertResult = await db
      .insert(prompts)
      .values({
        quizSessionId: session.id,
        question: nextPrompt.content,
        position: previousPrompts.length,
      })
      .returning();

    return { type: "question", prompt: insertResult[0] };
  } else {
    const concludedQuizSession = await saveConclusionsForSession(
      session.id,
      nextPrompt.content
    );

    return { type: "conclusion", session: concludedQuizSession };
  }
};

export const saveUserAnswerForPrompt = async (
  promptId: string,
  userAnswer: string
) => {
  const result = await db
    .update(prompts)
    .set({
      answer: userAnswer,
    })
    .where(eq(prompts.id, promptId))
    .returning();

  return result[0];
};

export const saveConclusionsForSession = async (
  sessionId: string,
  conclusion: string
): Promise<QuizSession> => {
  const result = await db
    .update(quizSessions)
    .set({
      conclusion,
    })
    .where(eq(quizSessions.id, sessionId))
    .returning();

  return result[0];
};
