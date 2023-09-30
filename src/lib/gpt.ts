import { ChatOpenAI } from "langchain/chat_models/openai";

const gpt = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export default gpt;
