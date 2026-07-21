import React from "react";

interface EndpointChipProps extends React.HTMLAttributes<HTMLDivElement> {
  method: string;
  path: string;
  label: string;
  isActive?: boolean;
}

export const EndpointChip: React.FC<EndpointChipProps> = ({
  method,
  path,
  label,
  isActive = false,
  className = "",
  ...props
}) => (
  <div
    {...props}
    className={`relative group px-2 md:px-3 py-2 rounded font-mono text-xs transition-all flex items-center space-x-1 md:space-x-1.5 border min-h-[44px] min-w-[44px] justify-center md:justify-start ${
      isActive
        ? "bg-bg-primary text-status-info border-white/[.12]"
        : "text-text-secondary border-transparent hover:text-text-primary hover:bg-bg-primary/80"
    } ${className}`}
  >
    <span className={`hidden md:inline ${isActive ? "text-status-info" : "text-text-muted group-hover:text-text-secondary"}`}>
      {method}
    </span>
    <span className="hidden md:inline">{path}</span>
    <span className="md:hidden text-[10px]">{label}</span>
    {isActive && (
      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-status-info rounded-full" aria-hidden="true"></span>
    )}
  </div>
);
