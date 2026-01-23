"use client";

import { useState, ReactNode } from "react";
import { AiSelectedModelContext } from "./AiSelectedModelContext";
import { DefaultModel } from "@/shared/AiModels";

export function AiSelectedModelProvider({ children }: { children: ReactNode }) {
  const [aiSelectedModels, setAiSelectedModels] = useState(DefaultModel);

  return (
    <AiSelectedModelContext.Provider
      value={{ aiSelectedModels, setAiSelectedModels }}
    >
      {children}
    </AiSelectedModelContext.Provider>
  );
}
