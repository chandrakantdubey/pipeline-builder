// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  EdgeTypes,
  getBezierPath,
  MarkerType,
} from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { CalculatorNode } from "./nodes/calculatorNode";
import { ImageProcessorNode } from "./nodes/imageProcessorNode";
import { TranslatorNode } from "./nodes/translatorNode";
import { TimerNode } from "./nodes/timerNode";

import "reactflow/dist/style.css";
import CustomEdge from "./CustomeEdge";
import styled from "styled-components";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  calculator: CalculatorNode,
  imageProcessor: ImageProcessorNode,
  translator: TranslatorNode,
  timer: TimerNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const edgeTypes = {
  custom: CustomEdge,
};

const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${(props) => props.theme.colors.background};

  .react-flow__node {
    border-radius: 8px;
    box-shadow: ${(props) => props.theme.shadows.md};
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: ${(props) => props.theme.shadows.lg};
    }
  }

  .react-flow__handle {
    width: 8px;
    height: 8px;
    background-color: ${(props) => props.theme.colors.primary};
    border: 2px solid ${(props) => props.theme.colors.surface};
  }

  .react-flow__edge {
    path {
      stroke: ${(props) => props.theme.colors.primary};
      stroke-width: 2;
    }
  }

  .react-flow__controls {
    background: ${(props) => props.theme.colors.surface};
    border-radius: 8px;
    box-shadow: ${(props) => props.theme.shadows.md};
    padding: 4px;

    button {
      background: ${(props) => props.theme.colors.surface};
      border-radius: 4px;
      color: ${(props) => props.theme.colors.text.primary};
      border: 1px solid ${(props) => props.theme.colors.border};

      &:hover {
        background: ${(props) => props.theme.colors.background};
      }
    }
  }
`;

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow"),
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: "100wv", height: "70vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{
            type: "custom",
          }}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
};
