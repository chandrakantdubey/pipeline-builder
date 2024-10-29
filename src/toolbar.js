// toolbar.js

import styled from "styled-components";
import { DraggableNode } from "./draggableNode";

const ToolbarContainer = styled.div`
  background: ${(props) => props.theme.colors.surface};
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const ToolbarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${(props) => props.theme.spacing.md};
`;

const ToolbarSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const SectionTitle = styled.h3`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 14px;
  margin-bottom: ${(props) => props.theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const PipelineToolbar = () => {
  return (
    <ToolbarContainer>
      <ToolbarSection>
        <SectionTitle>Basic Nodes</SectionTitle>
        <ToolbarGrid>
          <DraggableNode type="customInput" label="Input" icon="📥" />
          <DraggableNode type="customOutput" label="Output" icon="📤" />
          <DraggableNode type="text" label="Text" icon="📝" />
        </ToolbarGrid>
      </ToolbarSection>

      <ToolbarSection>
        <SectionTitle>Processing Nodes</SectionTitle>
        <ToolbarGrid>
          <DraggableNode type="llm" label="LLM" icon="🤖" />
          <DraggableNode type="calculator" label="Calculator" icon="🔢" />
          <DraggableNode type="imageProcessor" label="Image" icon="🖼️" />
          <DraggableNode type="translator" label="Translator" icon="🌐" />
          <DraggableNode type="timer" label="Timer" icon="⏱️" />
        </ToolbarGrid>
      </ToolbarSection>
    </ToolbarContainer>
  );
};
