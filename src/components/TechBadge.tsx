import React from "react";

interface TechBadgeProps {
  name: string;
  tooltip?: string;
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  name,
  tooltip,
  className = "",
}) => {
  return (
    <div
      title={tooltip || `Technology: ${name}`}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border border-border-primary/80 bg-bg-secondary/60 text-text-secondary hover:text-text-primary hover:border-status-info transition-all duration-150 font-mono text-[10px] md:text-[11px] font-semibold cursor-default select-none w-fit ${className}`}
    >
      {name}
    </div>
  );
};
