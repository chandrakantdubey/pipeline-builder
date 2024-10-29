import React, { useState, useEffect } from "react";
import { BaseNode } from "./BaseNode";
import styled from "styled-components";
import { NodeSection, Label } from "../components/nodeStyles";

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.primary};
  background: ${(props) => props.theme.colors.background};
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}20;
  }
`;

const VariableBadge = styled.span`
  display: inline-block;
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  background: ${(props) => props.theme.colors.primary}15;
  color: ${(props) => props.theme.colors.primary};
  border-radius: 12px;
  font-size: 12px;
  margin-right: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    // Extract variables from text ({{variable}})
    const matches = text.match(/\{\{([^}]+)\}\}/g) || [];
    const vars = matches.map((match) => match.slice(2, -2).trim());
    setVariables([...new Set(vars)]); // Remove duplicates
  }, [text]);

  return (
    <BaseNode
      id={id}
      icon="📝"
      title="Text"
      borderColor="#F59E0B"
      inputs={variables.map((variable) => ({
        id: `${id}-${variable}`,
        label: variable,
      }))}
      outputs={[{ id: `${id}-output`, label: "Output" }]}
    >
      <NodeSection>
        <Label>Text Content</Label>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here. Use {{variable}} for dynamic inputs."
        />
      </NodeSection>

      {variables.length > 0 && (
        <NodeSection>
          <Label>Variables</Label>
          <div>
            {variables.map((variable) => (
              <VariableBadge key={variable}>{variable}</VariableBadge>
            ))}
          </div>
        </NodeSection>
      )}
    </BaseNode>
  );
};
