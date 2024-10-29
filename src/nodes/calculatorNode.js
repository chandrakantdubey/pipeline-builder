import React, { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeSection, Label, Select, Input } from "../components/nodeStyles";

const operations = [
  { value: "add", label: "Add", icon: "+" },
  { value: "subtract", label: "Subtract", icon: "-" },
  { value: "multiply", label: "Multiply", icon: "×" },
  { value: "divide", label: "Divide", icon: "÷" },
  { value: "modulo", label: "Modulo", icon: "%" },
  { value: "power", label: "Power", icon: "^" },
  { value: "round", label: "Round", icon: "≈" },
];

const roundingModes = [
  { value: "none", label: "No Rounding" },
  { value: "nearest", label: "Nearest Integer" },
  { value: "floor", label: "Floor" },
  { value: "ceil", label: "Ceiling" },
  { value: "decimal", label: "Decimal Places" },
];

export const CalculatorNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || "add");
  const [roundingMode, setRoundingMode] = useState(
    data?.roundingMode || "none",
  );
  const [decimalPlaces, setDecimalPlaces] = useState(data?.decimalPlaces || 2);
  const [defaultValue, setDefaultValue] = useState(data?.defaultValue || "0");

  const selectedOp = operations.find((op) => op.value === operation);

  return (
    <BaseNode
      id={id}
      icon="🔢"
      title="Calculator"
      borderColor="#10B981"
      inputs={[
        { id: `${id}-num1`, label: "Number 1" },
        { id: `${id}-num2`, label: "Number 2" },
      ]}
      outputs={[{ id: `${id}-result`, label: "Result" }]}
    >
      <NodeSection>
        <Label>Operation</Label>
        <Select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          {operations.map((op) => (
            <option key={op.value} value={op.value}>
              {op.icon} {op.label}
            </option>
          ))}
        </Select>
      </NodeSection>

      <NodeSection>
        <Label>Rounding</Label>
        <Select
          value={roundingMode}
          onChange={(e) => setRoundingMode(e.target.value)}
        >
          {roundingModes.map((mode) => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </Select>
      </NodeSection>

      {roundingMode === "decimal" && (
        <NodeSection>
          <Label>Decimal Places</Label>
          <Input
            type="number"
            min="0"
            max="10"
            value={decimalPlaces}
            onChange={(e) => setDecimalPlaces(parseInt(e.target.value))}
          />
        </NodeSection>
      )}

      <NodeSection>
        <Label>Default Value</Label>
        <Input
          type="number"
          value={defaultValue}
          onChange={(e) => setDefaultValue(e.target.value)}
          placeholder="Default value for empty inputs"
        />
      </NodeSection>
    </BaseNode>
  );
};
