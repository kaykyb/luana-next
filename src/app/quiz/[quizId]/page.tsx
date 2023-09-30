import React from "react";
import { getQuiz } from "../../../lib/quizzes";
import { AnsweringForm } from "./answeringForm";

export default async function QuizPage({
  params,
}: {
  params: { quizId: string };
}) {
  const quiz = await getQuiz(params.quizId);

  return (
    <main className="mt-8">
      <section className="py-2">
        <h1 className="font-display text-4xl">{quiz.title}</h1>
      </section>
      <section className="mt-4">
        <AnsweringForm quizId={quiz.id} />
      </section>
    </main>
  );
}
