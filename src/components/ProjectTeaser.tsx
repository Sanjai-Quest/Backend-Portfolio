import React from "react";
import { ArrowUpRight } from "lucide-react";

export interface ProjectTeaserProps {
  title: string;
  description: string;
  onClick: () => void;
}

export const ProjectTeaser: React.FC<ProjectTeaserProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left relative bg-bg-secondary/40 border border-border-primary/50 hover:border-signature/40 hover:bg-card-bg/60 p-5 rounded-lg transition-all duration-200 group flex flex-col justify-between h-full select-none focus:outline-none focus:ring-1 focus:ring-signature/50"
      aria-label={`Inspect details for ${title}`}
    >
      {/* Schematic Corner Brackets in muted gray, glowing signature orange on card hover */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-border-primary/60 group-hover:border-signature transition-colors duration-200"></div>
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-border-primary/60 group-hover:border-signature transition-colors duration-200"></div>
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-border-primary/60 group-hover:border-signature transition-colors duration-200"></div>
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-border-primary/60 group-hover:border-signature transition-colors duration-200"></div>

      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-bold font-mono tracking-tight text-text-primary group-hover:text-signature transition-colors duration-150 uppercase">
            {title}
          </h3>
          <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-signature group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
        </div>
        <p className="text-text-muted text-[11px] leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </button>
  );
};
