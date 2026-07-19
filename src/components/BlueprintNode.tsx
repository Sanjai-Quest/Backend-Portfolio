import React from "react";
import { Handle, Position } from "@xyflow/react";

interface BlueprintNodeProps {
  data: {
    label: string;
    subtitle?: string;
    status?: string;
  };
  selected?: boolean;
}

export const BlueprintNode: React.FC<BlueprintNodeProps> = ({ data, selected }) => {
  const isHealthy = data.status === "Healthy" || data.status === "Running";

  return (
    <div
      className={`relative px-4 py-3 bg-card-bg/95 border rounded font-mono text-[11px] text-text-primary text-center min-w-[140px] select-none transition-all duration-150 ${
        selected ? "border-signature shadow-[0_0_8px_rgba(255,122,69,0.25)]" : "border-border-primary"
      }`}
    >
      {/* Schematic Corner Brackets in signature orange color */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-signature rounded-tl-[1px]"></div>
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-signature rounded-tr-[1px]"></div>
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-signature rounded-bl-[1px]"></div>
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-signature rounded-br-[1px]"></div>

      {/* Target/Input handle at top */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-border-primary !border !border-card-bg !w-2 !h-2"
      />

      {/* Node Content */}
      <div className="font-bold text-xs uppercase text-text-primary tracking-tight">
        {data.label}
      </div>
      
      {data.subtitle && (
        <div className="text-[9px] text-text-muted mt-0.5 uppercase tracking-wide">
          {data.subtitle}
        </div>
      )}

      {data.status && (
        <div className="flex items-center justify-center space-x-1 mt-1.5 select-none">
          <span className={`w-1 h-1 rounded-full ${isHealthy ? "bg-status-success animate-pulse" : "bg-status-warning"}`}></span>
          <span className="text-[8px] text-text-secondary tracking-wider uppercase font-semibold">
            {data.status}
          </span>
        </div>
      )}

      {/* Source/Output handle at bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-border-primary !border !border-card-bg !w-2 !h-2"
      />
    </div>
  );
};
