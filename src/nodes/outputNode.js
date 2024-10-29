import React, { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeSection, Label, Input, Select } from "../components/nodeStyles";

const outputTypes = [
  { value: "text", label: "Text", icon: "📝" },
  { value: "json", label: "JSON", icon: "{ }" },
  { value: "image", label: "Image", icon: "🖼️" },
  { value: "file", label: "File", icon: "📁" },
  { value: "api", label: "API Response", icon: "🌐" },
];

export const OutputNode = ({ id, data }) => {
  const [outputName, setOutputName] = useState(
    data?.outputName || id.replace("customOutput-", "output_"),
  );
  const [outputType, setOutputType] = useState(data?.outputType || "text");
  const [description, setDescription] = useState(data?.description || "");

  const selectedType = outputTypes.find((t) => t.value === outputType);

  return (
    <BaseNode
      id={id}
      icon={selectedType.icon}
      title="Output"
      borderColor="#2563EB"
      inputs={[{ id: `${id}-value`, label: "Value" }]}
    >
      <NodeSection>
        <Label>Output Name</Label>
        <Input
          value={outputName}
          onChange={(e) => setOutputName(e.target.value)}
          placeholder="Enter output name"
        />
      </NodeSection>

      <NodeSection>
        <Label>Output Type</Label>
        <Select
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          {outputTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.icon} {type.label}
            </option>
          ))}
        </Select>
      </NodeSection>

      <NodeSection>
        <Label>Description (Optional)</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe this output"
        />
      </NodeSection>
    </BaseNode>
  );
};
