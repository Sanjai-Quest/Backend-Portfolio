import React from "react";
import { StatusBadge } from "./StatusBadge";

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  badgeText?: string | number;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  eyebrow,
  badgeText,
  className = "",
}) => {
  return (
    <div className={`flex flex-col space-y-2 mb-6 text-left ${className}`}>
      {eyebrow ? (
        <div className="flex items-center space-x-2 select-none">
          {/* Eyebrow Callout Tag */}
          <div className="font-mono text-[9px] md:text-[10px] font-bold text-status-info bg-status-info/5 border border-status-info/30 px-2 py-0.5 rounded uppercase tracking-wider">
            {eyebrow}
          </div>
          {/* Dashed Leader Line */}
          <div className="w-8 border-b border-dashed border-border-primary"></div>
          {/* Heading Title */}
          <h2 className="font-mono text-sm md:text-base font-bold tracking-tight text-text-primary uppercase">
            {title}
          </h2>
          {badgeText && (
            <StatusBadge
              status={badgeText}
              showDot={true}
              pulse={badgeText === "Healthy" || badgeText === 200 || badgeText === "Running"}
              className="ml-2 scale-90"
            />
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <h2 className="font-mono text-sm md:text-base font-bold tracking-tight text-text-primary uppercase">
            {title}
          </h2>
          {badgeText && (
            <StatusBadge
              status={badgeText}
              showDot={true}
              pulse={badgeText === "Healthy" || badgeText === 200 || badgeText === "Running"}
              className="scale-90"
            />
          )}
        </div>
      )}
    </div>
  );
};
