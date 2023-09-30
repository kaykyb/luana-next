import { EvaluateePrompt, EvaluateeQuizSession } from "./types";

type ERROR_CODE = "NOT_FOUND";

export type ApiError = {
  ok: false;
  error: {
    code: ERROR_CODE;
    message: string;
    context: any;
  };
};

export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiResponse<T> = ApiError | ApiSuccess<T>;

export const jsonApiResponse = <T>(response: ApiResponse<T>) => {
  return Response.json(response);
};

// endpoints
export type PostStartEvaluateeQuizSessionResponse = {
  session: EvaluateeQuizSession;
  firstPrompt: EvaluateePrompt;
};

export type PatchPromptWithAnswerResponse = {};

export type PostPromptResponse =
  | {
      type: "question";
      prompt: EvaluateePrompt;
    }
  | {
      type: "conclusion";
      conclusion: string;
    };
