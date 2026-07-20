import React, { useEffect, useRef } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

interface BlueprintNodeProps {
  id: string;
  data: {
    label: string;
    subtitle?: string;
    status?: string;
    details?: {
      whatIs: string;
      whatFor: string;
    };
  };
  selected?: boolean;
}

export const BlueprintNode: React.FC<BlueprintNodeProps> = ({ id, data, selected }) => {
  const isHealthy = data.status === "Healthy" || data.status === "Running";
  const { setNodes } = useReactFlow();
  const nodeRef = useRef<HTMLDivElement>(null);

  // Focus the node container visually if selected
  useEffect(() => {
    if (selected && nodeRef.current) {
      nodeRef.current.focus();
    }
  }, [selected]);

  // Handle keydown events for selection trigger and escape deselect
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setNodes((nodes) =>
        nodes.map((n) => ({
          ...n,
          selected: n.id === id,
        }))
      );
    } else if (e.key === "Escape") {
      e.preventDefault();
      setNodes((nodes) => nodes.map((n) => ({ ...n, selected: false })));
    }
  };

  const handleClosePanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((nodes) =>
      nodes.map((n) => (n.id === id ? { ...n, selected: false } : n))
    );
  };

  return (
    <div
      ref={nodeRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`relative px-4 py-3 bg-card-bg/95 border rounded font-mono text-[11px] text-text-primary text-center min-w-[140px] select-none transition-all duration-150 outline-none focus:ring-1 focus:ring-signature focus:border-signature ${
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

      {/* Reveal Detail Panel Popover */}
      {selected && data.details && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-[200] w-64 bg-card-bg border border-signature p-3 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.4)] text-left font-mono pointer-events-auto"
        >
          <div className="flex items-start justify-between border-b border-border-primary/60 pb-1 mb-1.5">
            <span className="font-bold text-[10px] text-signature uppercase tracking-wider">
              {data.label}
            </span>
            <button
              onClick={handleClosePanel}
              className="text-[9px] text-text-muted hover:text-text-primary transition-colors focus:outline-none"
              title="Close panel"
            >
              [X]
            </button>
          </div>
          <div className="space-y-1.5 text-[9px] leading-relaxed">
            <div>
              <span className="text-text-muted uppercase font-bold tracking-wide">what is:</span>{" "}
              <span className="text-text-primary">{data.details.whatIs}</span>
            </div>
            <div>
              <span className="text-text-muted uppercase font-bold tracking-wide">what for:</span>{" "}
              <span className="text-text-secondary">{data.details.whatFor}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
