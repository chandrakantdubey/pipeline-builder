import React from "react";
import { Handle, Position } from "reactflow";
import {
  NodeWrapper,
  NodeHeader,
  NodeIcon,
  NodeTitle,
} from "../components/nodeStyles";

export const BaseNode = ({
  id,
  icon,
  title,
  borderColor,
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <NodeWrapper borderColor={borderColor}>
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${input.id}`}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            top:
              outputs.length === 1
                ? "50%"
                : `${((index + 1) * 100) / (outputs.length + 1)}%`,
            background: `linear-gradient(135deg, ${borderColor} 0%, rgba(59, 130, 246, 0.7) 100%)`,
            border: "none",
            width: "12px",
            height: "12px",
            boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
          }}
        />
      ))}

      <NodeHeader>
        <NodeIcon>{icon}</NodeIcon>
        <NodeTitle>{title}</NodeTitle>
      </NodeHeader>

      {children}

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${output.id}`}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            top:
              outputs.length === 1
                ? "50%"
                : `${((index + 1) * 100) / (outputs.length + 1)}%`,
            backgroundColor: borderColor,
          }}
        />
      ))}
    </NodeWrapper>
  );
};
