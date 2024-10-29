import React, { useState } from "react";
import { BaseNode } from "./BaseNode";
import {
  NodeSection,
  Label,
  Select,
  Input,
  ModelBadge,
} from "../components/nodeStyles";

const models = [
  { value: "gpt-4", label: "GPT-4", provider: "OpenAI" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "OpenAI" },
  { value: "claude-2", label: "Claude 2", provider: "Anthropic" },
  { value: "palm-2", label: "PaLM 2", provider: "Google" },
];

const temperatures = [
  { value: 0, label: "Deterministic" },
  { value: 0.3, label: "Conservative" },
  { value: 0.7, label: "Balanced" },
  { value: 1, label: "Creative" },
];

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || "gpt-4");
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);
  const [maxTokens, setMaxTokens] = useState(data?.maxTokens || 1000);

  const selectedModel = models.find((m) => m.value === model);

  return (
    <BaseNode
      id={id}
      icon="🤖"
      title="Language Model"
      borderColor="#7C3AED"
      inputs={[
        { id: `${id}-system`, label: "System" },
        { id: `${id}-prompt`, label: "Prompt" },
      ]}
      outputs={[{ id: `${id}-response`, label: "Response" }]}
    >
      <NodeSection>
        <ModelBadge>
          {selectedModel.provider} / {selectedModel.label}
        </ModelBadge>
      </NodeSection>

      <NodeSection>
        <Label>Model</Label>
        <Select value={model} onChange={(e) => setModel(e.target.value)}>
          {models.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </Select>
      </NodeSection>

      <NodeSection>
        <Label>Temperature</Label>
        <Select
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
        >
          {temperatures.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label} ({t.value})
            </option>
          ))}
        </Select>
      </NodeSection>

      <NodeSection>
        <Label>Max Tokens</Label>
        <Input
          type="number"
          min="1"
          max="4096"
          value={maxTokens}
          onChange={(e) => setMaxTokens(parseInt(e.target.value))}
        />
      </NodeSection>
    </BaseNode>
  );
};
