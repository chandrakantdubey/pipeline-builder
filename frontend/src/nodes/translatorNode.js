import React, { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeSection, Label, Select, Input } from "../components/nodeStyles";

const languages = [
  { value: "en", label: "English", icon: "🇺🇸" },
  { value: "es", label: "Spanish", icon: "🇪🇸" },
  { value: "fr", label: "French", icon: "🇫🇷" },
  { value: "de", label: "German", icon: "🇩🇪" },
  { value: "it", label: "Italian", icon: "🇮🇹" },
  { value: "pt", label: "Portuguese", icon: "🇵🇹" },
  { value: "ru", label: "Russian", icon: "🇷🇺" },
  { value: "zh", label: "Chinese", icon: "🇨🇳" },
  { value: "ja", label: "Japanese", icon: "🇯🇵" },
  { value: "ko", label: "Korean", icon: "🇰🇷" },
];

const formality = [
  { value: "formal", label: "Formal" },
  { value: "informal", label: "Informal" },
  { value: "auto", label: "Auto-detect" },
];

export const TranslatorNode = ({ id, data }) => {
  const [sourceLang, setSourceLang] = useState(data?.sourceLang || "auto");
  const [targetLang, setTargetLang] = useState(data?.targetLang || "en");
  const [formalityLevel, setFormalityLevel] = useState(
    data?.formalityLevel || "auto",
  );
  const [preserveFormatting, setPreserveFormatting] = useState(
    data?.preserveFormatting || true,
  );

  return (
    <BaseNode
      id={id}
      icon="🌐"
      title="Translator"
      borderColor="#0EA5E9"
      inputs={[{ id: `${id}-text`, label: "Input Text" }]}
      outputs={[{ id: `${id}-translated`, label: "Translated Text" }]}
    >
      <NodeSection>
        <Label>Source Language</Label>
        <Select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        >
          <option value="auto">🔍 Auto-detect</option>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.icon} {lang.label}
            </option>
          ))}
        </Select>
      </NodeSection>

      <NodeSection>
        <Label>Target Language</Label>
        <Select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.icon} {lang.label}
            </option>
          ))}
        </Select>
      </NodeSection>

      <NodeSection>
        <Label>Formality Level</Label>
        <Select
          value={formalityLevel}
          onChange={(e) => setFormalityLevel(e.target.value)}
        >
          {formality.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </Select>
      </NodeSection>

      <NodeSection>
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            checked={preserveFormatting}
            onChange={(e) => setPreserveFormatting(e.target.checked)}
          />
          <span style={{ fontSize: "14px", color: "#666" }}>
            Preserve Formatting
          </span>
        </label>
      </NodeSection>
    </BaseNode>
  );
};
