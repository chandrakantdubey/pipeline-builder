import React, { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeSection, Label, Select, Input } from "../components/nodeStyles";

const filters = [
  { value: "grayscale", label: "Grayscale", icon: "⚫" },
  { value: "blur", label: "Blur", icon: "🌫️" },
  { value: "sharpen", label: "Sharpen", icon: "✨" },
  { value: "brighten", label: "Brighten", icon: "☀️" },
  { value: "darken", label: "Darken", icon: "🌙" },
  { value: "sepia", label: "Sepia", icon: "🎞️" },
  { value: "invert", label: "Invert", icon: "🔄" },
];

const formats = [
  { value: "original", label: "Original Format" },
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "gif", label: "GIF" },
];

export const ImageProcessorNode = ({ id, data }) => {
  const [filter, setFilter] = useState(data?.filter || "grayscale");
  const [intensity, setIntensity] = useState(data?.intensity || 50);
  const [outputFormat, setOutputFormat] = useState(
    data?.outputFormat || "original",
  );
  const [quality, setQuality] = useState(data?.quality || 80);
  const [resize, setResize] = useState(data?.resize || false);
  const [maxWidth, setMaxWidth] = useState(data?.maxWidth || 1920);
  const [maxHeight, setMaxHeight] = useState(data?.maxHeight || 1080);

  const selectedFilter = filters.find((f) => f.value === filter);

  return (
    <BaseNode
      id={id}
      icon="🖼️"
      title="Image Processor"
      borderColor="#9333EA"
      inputs={[{ id: `${id}-image`, label: "Input Image" }]}
      outputs={[{ id: `${id}-processed`, label: "Processed Image" }]}
    >
      <NodeSection>
        <Label>Filter Type</Label>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {filters.map((f) => (
            <option key={f.value} value={f.value}>
              {f.icon} {f.label}
            </option>
          ))}
        </Select>
      </NodeSection>

      <NodeSection>
        <Label>Intensity ({intensity}%)</Label>
        <Input
          type="range"
          min="0"
          max="100"
          value={intensity}
          onChange={(e) => setIntensity(parseInt(e.target.value))}
        />
      </NodeSection>

      <NodeSection>
        <Label>Output Format</Label>
        <Select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
        >
          {formats.map((format) => (
            <option key={format.value} value={format.value}>
              {format.label}
            </option>
          ))}
        </Select>
      </NodeSection>

      {outputFormat !== "original" && (
        <NodeSection>
          <Label>Quality ({quality}%)</Label>
          <Input
            type="range"
            min="1"
            max="100"
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
          />
        </NodeSection>
      )}

      <NodeSection>
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            checked={resize}
            onChange={(e) => setResize(e.target.checked)}
          />
          <span style={{ fontSize: "14px", color: "#666" }}>
            Enable Resizing
          </span>
        </label>
      </NodeSection>

      {resize && (
        <>
          <NodeSection>
            <Label>Max Width (px)</Label>
            <Input
              type="number"
              min="1"
              value={maxWidth}
              onChange={(e) => setMaxWidth(parseInt(e.target.value))}
            />
          </NodeSection>
          <NodeSection>
            <Label>Max Height (px)</Label>
            <Input
              type="number"
              min="1"
              value={maxHeight}
              onChange={(e) => setMaxHeight(parseInt(e.target.value))}
            />
          </NodeSection>
        </>
      )}
    </BaseNode>
  );
};
