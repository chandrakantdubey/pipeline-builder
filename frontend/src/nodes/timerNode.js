import React, { useState } from "react";
import { BaseNode } from "./BaseNode";
import { NodeSection, Label, Select, Input } from "../components/nodeStyles";

const timeUnits = [
  { value: "ms", label: "Milliseconds", multiplier: 1 },
  { value: "s", label: "Seconds", multiplier: 1000 },
  { value: "m", label: "Minutes", multiplier: 60000 },
  { value: "h", label: "Hours", multiplier: 3600000 },
];

const triggerModes = [
  { value: "delay", label: "Delay", icon: "⏲️" },
  { value: "interval", label: "Interval", icon: "🔄" },
  { value: "schedule", label: "Schedule", icon: "📅" },
];

export const TimerNode = ({ id, data }) => {
  const [mode, setMode] = useState(data?.mode || "delay");
  const [timeValue, setTimeValue] = useState(data?.timeValue || 1);
  const [timeUnit, setTimeUnit] = useState(data?.timeUnit || "s");
  const [maxExecutions, setMaxExecutions] = useState(data?.maxExecutions || 1);
  const [schedule, setSchedule] = useState(data?.schedule || "0 0 * * *");

  const selectedMode = triggerModes.find((m) => m.value === mode);

  return (
    <BaseNode
      id={id}
      icon={selectedMode.icon}
      title="Timer"
      borderColor="#F97316"
      inputs={[{ id: `${id}-trigger`, label: "Trigger" }]}
      outputs={[{ id: `${id}-timeout`, label: "Timeout" }]}
    >
      <NodeSection>
        <Label>Timer Mode</Label>
        <Select value={mode} onChange={(e) => setMode(e.target.value)}>
          {triggerModes.map((m) => (
            <option key={m.value} value={m.value}>
              {m.icon} {m.label}
            </option>
          ))}
        </Select>
      </NodeSection>

      {mode !== "schedule" ? (
        <>
          <NodeSection>
            <Label>Time Value</Label>
            <Input
              type="number"
              min="1"
              value={timeValue}
              onChange={(e) => setTimeValue(parseInt(e.target.value))}
            />
          </NodeSection>

          <NodeSection>
            <Label>Time Unit</Label>
            <Select
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
            >
              {timeUnits.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </Select>
          </NodeSection>
        </>
      ) : (
        <NodeSection>
          <Label>Cron Schedule</Label>
          <Input
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="0 0 * * *"
          />
        </NodeSection>
      )}

      {mode === "interval" && (
        <NodeSection>
          <Label>Max Executions (0 = infinite)</Label>
          <Input
            type="number"
            min="0"
            value={maxExecutions}
            onChange={(e) => setMaxExecutions(parseInt(e.target.value))}
          />
        </NodeSection>
      )}
    </BaseNode>
  );
};
