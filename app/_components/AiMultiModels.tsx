"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AiModelList from "@/shared/AiModelList";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Lock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/FireBaseConfig";

// Define types
interface SubModel {
  name: string;
  premium?: boolean;
}

interface AiModel {
  model: string;
  icon: string;
  enable: boolean;
  subModel: SubModel[];
  premium?: boolean;
}

const AiMultiModels = () => {
  const { user } = useUser();
  const [aiModelList, setAiModelList] = useState<AiModel[]>(AiModelList);
  const { aiSelectedModels, setAiSelectedModels } = useContext(
    AiSelectedModelContext,
  );

  const onToggleChange = (model: string, value: boolean) => {
    setAiModelList((prev) =>
      prev.map((m) => (m.model === model ? { ...m, enable: value } : m)),
    );
  };

  const onSelectedValue = async (parentModel: string, value: string) => {
    const updatedModels = {
      ...aiSelectedModels,
      [parentModel]: {
        modelId: value,
      },
    };

    setAiSelectedModels(updatedModels);

    if (user?.primaryEmailAddress?.emailAddress) {
      const docRef = doc(db, "users", user.primaryEmailAddress.emailAddress);
      await updateDoc(docRef, {
        selectedModelPref: updatedModels,
      });
    }
  };

  return (
    <div className="flex flex-1 h-[75vh] border-b">
      {aiModelList.map((model, index) => (
        <div
          key={model.model}
          className="flex flex-col border-r h-full min-w-[400px]"
        >
          <div className="flex w-full items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <Image src={model.icon} alt="models" width={24} height={24} />

              {model.enable && model.subModel && model.subModel.length > 0 && (
                <Select
                  defaultValue={aiSelectedModels[model.model]?.modelId}
                  onValueChange={(value) => onSelectedValue(model.model, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={aiSelectedModels[model.model]?.modelId}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="p-3">
                      <SelectLabel className="text-gray-500 text-sm">
                        Free
                      </SelectLabel>
                      {model.subModel.map(
                        (submodel, subIndex) =>
                          !submodel.premium && (
                            <SelectItem
                              key={`${model.model}-${subIndex}`}
                              value={submodel.name}
                            >
                              {submodel.name}
                            </SelectItem>
                          ),
                      )}
                    </SelectGroup>

                    <SelectGroup className="p-3">
                      <SelectLabel className="text-sm text-gray-500">
                        Premium
                      </SelectLabel>
                      {model.subModel.map(
                        (submodel, subIndex) =>
                          submodel.premium && (
                            <SelectItem
                              key={`${model.model}-premium-${subIndex}`}
                              value={submodel.name}
                              disabled={submodel.premium}
                            >
                              <div className="flex items-center gap-2">
                                {submodel.name}
                                <Lock className="h-4 w-4" />
                              </div>
                            </SelectItem>
                          ),
                      )}
                    </SelectGroup>
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
                  onClick={() => onToggleChange(model.model, true)}
                  className="cursor-pointer h-5 w-5"
                />
              )}
            </div>
          </div>
          {model.premium && model.enable && (
            <div className="flex items-center justify-center p-4">
              <Button>
                <Lock className="mr-2 h-4 w-4" />
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
