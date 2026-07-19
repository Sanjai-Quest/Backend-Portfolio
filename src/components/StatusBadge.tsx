import React from "react";

export type StatusBadgeType =
  | "success"
  | "info"
  | "warning"
  | "mutation"
  | "async"
  | "error";

interface StatusBadgeProps {
  status: string | number;
  showDot?: boolean;
  pulse?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showDot = true,
  pulse = false,
  className = "",
}) => {
  const statusStr = String(status).trim();
  const statusLower = statusStr.toLowerCase();

  // Determine the semantic category based on the status string/code
  let type: StatusBadgeType = "info";

  if (
    /^(2\d\d|ok|healthy|delivered|active|online|success)$/.test(statusLower)
  ) {
    type = "success";
  } else if (/^(4\d\d|5\d\d|error|offline|danger|failed)$/.test(statusLower)) {
    type = "error";
  } else if (/^(304|queued|pending|slow|warning)$/.test(statusLower)) {
    type = "warning";
  } else if (
    /^(post|put|maintenance|mutating|mutation)$/.test(statusLower)
  ) {
    type = "mutation";
  } else if (/^(kafka|async|processing|queue)$/.test(statusLower)) {
    type = "async";
  } else if (/^(1\d\d|302|running|proxying|info)$/.test(statusLower)) {
    type = "info";
  }

  // Map categories to color classes
  const colorMap = {
    success: "bg-status-success/10 border-status-success/30 text-status-success",
    error: "bg-status-error/10 border-status-error/30 text-status-error",
    warning: "bg-status-warning/10 border-status-warning/30 text-status-warning",
    mutation: "bg-status-mutation/10 border-status-mutation/30 text-status-mutation",
    async: "bg-status-async/10 border-status-async/30 text-status-async",
    info: "bg-status-info/10 border-status-info/30 text-status-info",
  };

  const dotColorMap = {
    success: "bg-status-success",
    error: "bg-status-error",
    warning: "bg-status-warning",
    mutation: "bg-status-mutation",
    async: "bg-status-async",
    info: "bg-status-info",
  };

  return (
    <div
      className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border font-mono text-[10px] md:text-[11px] font-semibold select-none w-fit ${colorMap[type]} ${className}`}
    >
      {showDot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          {pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 motion-reduce:hidden ${dotColorMap[type]}`}
            ></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColorMap[type]}`}
          ></span>
        </span>
      )}
      <span>{statusStr}</span>
    </div>
  );
};
