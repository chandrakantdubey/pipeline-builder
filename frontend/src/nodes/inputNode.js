import React, { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeSection, Label, Input, Select } from "../components/nodeStyles";

export const InputNode = ({ id, data }) => {
  const [inputName, setInputName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data?.inputType || "text");

  return (
    <BaseNode
      id={id}
      icon="📥"
      title="Input"
      borderColor="#059669"
      outputs={[{ id: `${id}-value`, label: "Value" }]}
    >
      <NodeSection>
        <Label>Input Name</Label>
        <Input
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Enter input name"
        />
      </NodeSection>

      <NodeSection>
        <Label>Input Type</Label>
        <Select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="file">File</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
        </Select>
      </NodeSection>
    </BaseNode>
  );
};
