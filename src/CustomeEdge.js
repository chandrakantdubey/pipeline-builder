import React from "react";
import { getBezierPath } from "reactflow";
import { useStore } from "./store";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const deleteEdge = useStore((state) => state.deleteEdge);
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <g
        transform={`translate(${(sourceX + targetX) / 2} ${(sourceY + targetY) / 2})`}
        className="react-flow__edge-button"
        onClick={(event) => {
          event.stopPropagation();
          deleteEdge(id);
        }}
      >
        <circle r="8" fill="red" className="edge-delete-button" />
        <text
          x="0"
          y="0"
          dominantBaseline="central"
          textAnchor="middle"
          fill="white"
          fontSize="10"
        >
          ×
        </text>
      </g>
    </>
  );
}
