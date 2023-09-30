export const jsonApiRequest = async <T>(request: Request): Promise<T> => {
  return await request.json();
};

// endpoints
export type PatchPromptWithAnswerRequest = {
  answer: string;
};

export type PostPromptRequest = {};
