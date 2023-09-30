import {
  PatchPromptWithAnswerRequest,
  jsonApiRequest,
} from "@/lib/api/request";
import {
  PatchPromptWithAnswerResponse,
  jsonApiResponse,
} from "@/lib/api/response";
import { saveUserAnswerForPrompt } from "@/lib/quizzes";

export async function PATCH(
  request: Request,
  { params }: { params: { sessionId: string; promptId: string } }
) {
  const requestBody = await jsonApiRequest<PatchPromptWithAnswerRequest>(
    request
  );

  await saveUserAnswerForPrompt(params.promptId, requestBody.answer);

  return jsonApiResponse<PatchPromptWithAnswerResponse>({
    ok: true,
    data: {},
  });
}
