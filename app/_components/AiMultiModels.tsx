"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AiModelList from "@/shared/AiModelList";
import React, { useState } from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Lock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define types
interface SubModel {
  name: string;
}

interface AiModel {
  model: string;
  icon: string;
  enable: boolean;
  subModel: SubModel[];
  premium?: boolean;
}

const AiMultiModels = () => {
  const [aiModelList, setAiModelList] = useState<AiModel[]>(AiModelList);
  
  const onToggleChange = (model: string, value: boolean) => {
    setAiModelList((prev) =>
      prev.map((m) => (m.model === model ? { ...m, enable: value } : m))
    );
  };

  return (
    <div className="flex flex-1 h-[75vh] border-b">
      {aiModelList.map((model, index) => (
        <div key={index} className="flex flex-col border-r h-full min-w-[400px]">
          <div className="flex w-full items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <Image src={model.icon} alt="models" width={24} height={24} />

              {model.enable && (
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={model.subModel[0].name} />
                  </SelectTrigger>
                  <SelectContent>
                    {model.subModel.map((submodel, index) => (
                      <SelectItem key={index} value={submodel.name}>
                        {submodel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {model.enable ? (
                <Switch
                  checked={model.enable}
                  onCheckedChange={(v) => onToggleChange(model.model, v)}
                />
              ) : (
                <MessageSquare
                  onClick={() => onToggleChange(model.model,true)}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
          {model.premium && model.enable && (
            <div className="flex items-center justify-center p-4">
              <Button>
                <Lock className="mr-2" />
                Upgrade to Unlock
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AiMultiModels;