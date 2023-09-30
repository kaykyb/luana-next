import {
  PostStartEvaluateeQuizSessionResponse,
  jsonApiResponse,
} from "@/lib/api/response";
import {
  getQuiz,
  pushNextPromptForQuizSession,
  startQuizSession,
} from "@/lib/quizzes";

export async function POST(
  request: Request,
  { params }: { params: { quizId: string } }
) {
  const quiz = await getQuiz(params.quizId);
  const session = await startQuizSession(quiz);
  const firstPrompt = await pushNextPromptForQuizSession(session);

  if (firstPrompt.type !== "question") {
    throw new Error("First prompt not a question");
  }

  return jsonApiResponse<PostStartEvaluateeQuizSessionResponse>({
    ok: true,
    data: {
      session,
      firstPrompt: {
        id: firstPrompt.prompt.id,
        question: firstPrompt.prompt.question,
      },
    },
  });
}
