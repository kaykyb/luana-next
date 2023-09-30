import { PostPromptResponse, jsonApiResponse } from "@/lib/api/response";
import { getQuizSession, pushNextPromptForQuizSession } from "@/lib/quizzes";

export async function POST(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  const session = await getQuizSession(params.sessionId);
  const prompt = await pushNextPromptForQuizSession(session);

  if (prompt.type === "question") {
    return jsonApiResponse<PostPromptResponse>({
      ok: true,
      data: {
        type: "question",
        prompt: {
          id: prompt.prompt.id,
          question: prompt.prompt.question,
        },
      },
    });
  } else {
    return jsonApiResponse<PostPromptResponse>({
      ok: true,
      data: {
        type: "conclusion",
        conclusion: prompt.session.conclusion as string,
      },
    });
  }
}
