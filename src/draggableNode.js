import styled from "styled-components";

const NodeContainer = styled.div`
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.md};
  cursor: grab;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.md};
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:active {
    cursor: grabbing;
  }
`;

const NodeIcon = styled.div`
  font-size: 24px;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  text-align: center;
`;

const NodeLabel = styled.span`
  display: block;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 14px;
  text-align: center;
  font-weight: 500;
`;

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: type }),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <NodeContainer
      draggable
      onDragStart={onDragStart}
      onDragEnd={(event) => event.preventDefault()}
    >
      <NodeIcon>{icon}</NodeIcon>
      <NodeLabel>{label}</NodeLabel>
    </NodeContainer>
  );
};
