import { PatchPromptWithAnswerRequest, PostPromptRequest } from "./request";
import {
  ApiResponse,
  PatchPromptWithAnswerResponse,
  PostPromptResponse,
  PostStartEvaluateeQuizSessionResponse,
} from "./response";

type ApiActionMethod = "POST" | "PUT" | "PATCH" | "DELETE";

export const apiAction = async <T, R>(
  endpoint: string,
  body: T,
  method: ApiActionMethod
): Promise<ApiResponse<R>> => {
  const response = await fetch(endpoint, {
    method,
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });

  switch (response.status) {
    case 401:
      throw new NotAuthorizedError(response.statusText);

    case 500:
      throw new InternalServerError(response.statusText);

    default:
      break;
  }

  return response.json();
};

export class NotAuthorizedError extends Error {}
export class NotFoundError extends Error {}
export class ForbiddenError extends Error {}
export class InternalServerError extends Error {}

export const startEvaluateeQuizSession = (quizId: string) =>
  apiAction<{}, PostStartEvaluateeQuizSessionResponse>(
    `/api/quizzes/${quizId}/sessions`,
    {},
    "POST"
  );

export const answerPrompt = (
  sessionId: string,
  promptId: string,
  answer: string
) =>
  apiAction<PatchPromptWithAnswerRequest, PatchPromptWithAnswerResponse>(
    `/api/sessions/${sessionId}/prompts/${promptId}`,
    {
      answer,
    },
    "PATCH"
  );

export const fetchNextPrompt = (quizSessionId: string) =>
  apiAction<PostPromptRequest, PostPromptResponse>(
    `/api/sessions/${quizSessionId}/prompts`,
    {},
    "POST"
  );
