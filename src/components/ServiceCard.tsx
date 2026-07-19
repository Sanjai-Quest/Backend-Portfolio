import React from "react";
import { ArrowRight, Code } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { TechBadge } from "./TechBadge";
import { Button } from "./Button";

export interface ServiceCardProps {
  title: string;
  description: string;
  tech: string[];
  status: string | number;
  link?: string;
  repoLink?: string;
  onInspect?: () => void;
  inspectLabel?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  tech,
  status,
  link,
  repoLink,
  onInspect,
  inspectLabel = "Inspect Service",
}) => {
  return (
    <div className="relative bg-bg-secondary border border-border-primary hover:border-signature/50 hover:bg-card-bg/60 p-6 rounded-lg transition-all duration-180 flex flex-col justify-between h-full group hover:shadow-glow-hover">
      {/* Schematic Corner Brackets in signature orange color */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-signature rounded-tl-[3px] opacity-75"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-signature rounded-tr-[3px] opacity-75"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-signature rounded-bl-[3px] opacity-75"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-signature rounded-br-[3px] opacity-75"></div>

      <div>
        {/* Card Header metadata */}
        <div className="flex justify-between items-center mb-3">
          <span className="font-mono text-[10px] text-text-muted select-none uppercase tracking-wider">
            cluster-service-node
          </span>
          <StatusBadge status={status} showDot={true} pulse={status === "Running" || status === 200} />
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold font-mono tracking-tight text-text-primary group-hover:text-status-info transition-colors duration-150">
          {title}
        </h3>
        <p className="text-text-muted text-xs mt-2 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Technology badges */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {tech.map((t) => (
            <TechBadge key={t} name={t} />
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-border-primary/40 flex items-center space-x-2">
        {onInspect ? (
          <Button
            variant="primary"
            onClick={(e) => {
              e.stopPropagation();
              onInspect();
            }}
            icon={ArrowRight}
            className="flex-1"
          >
            {inspectLabel}
          </Button>
        ) : (
          link && (
            <Button
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = link;
              }}
              icon={ArrowRight}
              className="flex-1"
            >
              {inspectLabel}
            </Button>
          )
        )}
        
        {repoLink && (
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              window.open(repoLink, "_blank");
            }}
            icon={Code}
            aria-label="View Repository Source Code"
          >
            Source
          </Button>
        )}
      </div>
    </div>
  );
};
