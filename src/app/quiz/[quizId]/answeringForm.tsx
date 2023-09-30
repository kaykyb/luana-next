"use client";
import React, { useState } from "react";
import {
  answerPrompt,
  fetchNextPrompt,
  startEvaluateeQuizSession,
} from "@/lib/api/fetcher";
import { EvaluateePrompt, EvaluateeQuizSession } from "@/lib/api/types";

export const AnsweringForm = ({ quizId }: { quizId: string }) => {
  const [isStarting, setIsStarting] = useState(false);

  const [quizSessionId, setQuizSessionId] =
    useState<EvaluateeQuizSession | null>(null);
  const [prompts, setPrompts] = useState<EvaluateePrompt[]>([]);
  const [conclusion, setConclusion] = useState<string | null>(null);

  const handleStart = async () => {
    setIsStarting(true);
    const response = await startEvaluateeQuizSession(quizId);

    if (response.ok) {
      setQuizSessionId(response.data.session);
      setPrompts([...prompts, response.data.firstPrompt]);
    }
    setIsStarting(false);
  };

  const handleNextPrompt = async () => {
    const response = await fetchNextPrompt(quizSessionId!.id);

    if (response.ok) {
      if (response.data.type === "question") {
        setPrompts([...prompts, response.data.prompt]);
      } else {
        setConclusion(response.data.conclusion);
      }
    }
  };

  if (!quizSessionId) {
    return (
      <div>
        <button
          onClick={handleStart}
          disabled={isStarting}
          className="px-6 py-2 bg-black text-white rounded-full font-bold disabled:opacity-40"
        >
          Start quiz
        </button>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {prompts.map((prompt) => (
        <PromptAnswerField
          key={prompt.id}
          session={quizSessionId}
          prompt={prompt}
          onNextPrompt={handleNextPrompt}
        />
      ))}
      {conclusion && <div>{conclusion}</div>}
    </section>
  );
};

const PromptAnswerField = ({
  session,
  prompt,
  onNextPrompt,
}: {
  session: EvaluateeQuizSession;
  prompt: EvaluateePrompt;
  onNextPrompt: () => void;
}) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleAnswer = async () => {
    await answerPrompt(session.id, prompt.id, answer);
    setHasAnswered(true);
    onNextPrompt();
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-normal">{prompt.question}</h2>
      <textarea
        className="mt-2 border rounded p-2"
        placeholder="Your answer"
        disabled={hasAnswered}
        value={answer}
        onChange={(ev) => setAnswer(ev.target.value)}
      />
      {!hasAnswered && (
        <button
          onClick={handleAnswer}
          className="mt-2 px-6 py-2 bg-white border border-gray-300 rounded font-bold"
        >
          Continuar
        </button>
      )}
    </div>
  );
};
