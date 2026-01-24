import { createContext, Dispatch, SetStateAction } from "react";

interface ModelConfig {
  modelId: string;
}

export type AiSelectedModelsType = {
  GPT: ModelConfig;
  Gemini: ModelConfig;
  DeepSeek: ModelConfig;
  Mistral: ModelConfig;
  Grok: ModelConfig;
  Cohere: ModelConfig;
  LLama: ModelConfig;
  [key: string]: ModelConfig;
};

interface AiSelectedModelContextType {
  aiSelectedModels: AiSelectedModelsType;
  setAiSelectedModels: Dispatch<SetStateAction<AiSelectedModelsType>>;
}

export const AiSelectedModelContext = createContext<AiSelectedModelContextType>(
  {
    aiSelectedModels: {
      GPT: { modelId: "gpt-4.1-mini" },
      Gemini: { modelId: "gemini-2.5-flash-lite" },
      DeepSeek: { modelId: "DeepSeek-R1" },
      Mistral: { modelId: "mistral-medium-2505" },
      Grok: { modelId: "grok-3-mini" },
      Cohere: { modelId: "cohere-command-a" },
      LLama: { modelId: "LLama-3.3-70B-Instruct" },
    },
    setAiSelectedModels: () => {},
  },
);
