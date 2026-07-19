import React from "react";
import { TechBadge } from "./TechBadge";

export interface TimelineItem {
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  tech?: string[];
  image?: string;
  imageAlt?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  layout?: "vertical" | "horizontal";
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  layout = "vertical",
  className = "",
}) => {
  if (layout === "horizontal") {
    return (
      <div className={`flex flex-col md:flex-row gap-6 relative w-full ${className}`}>
        {items.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center text-center relative px-4">
            {/* Horizontal line connector */}
            {idx < items.length - 1 && (
              <div className="hidden md:block absolute top-2 right-0 left-1/2 h-[2px] bg-border-primary/40 -translate-y-1/2 z-0" />
            )}

            {/* Step circle bullet */}
            <div className="w-4 h-4 rounded-full border-2 border-status-info bg-bg-primary z-10 flex items-center justify-center font-mono text-[9px] font-bold text-status-info shadow-[0_0_8px_rgba(59,130,246,0.3)] mb-3">
              {idx + 1}
            </div>

            {/* Date */}
            <span className="font-mono text-[10px] text-status-info uppercase tracking-wider mb-1">
              {item.date}
            </span>

            {/* Content text */}
            <h3 className="font-sans text-sm font-bold text-text-primary leading-tight">
              {item.title}
            </h3>
            {item.subtitle && (
              <span className="font-mono text-[10px] text-text-muted mt-0.5">
                {item.subtitle}
              </span>
            )}
            <p className="text-[11px] text-text-secondary leading-relaxed mt-2">
              {item.description}
            </p>

            {/* Optional Image */}
            {item.image && (
              <div className="mt-3 max-w-[200px] border border-border-primary/50 rounded overflow-hidden">
                <img src={item.image} alt={item.imageAlt || item.title} className="w-full h-auto object-cover" />
              </div>
            )}

            {/* Tech badges */}
            {item.tech && item.tech.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 mt-3">
                {item.tech.map((t) => (
                  <TechBadge key={t} name={t} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Vertical timeline
  return (
    <div className={`flex flex-col relative w-full ${className}`}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={idx} className="flex group">
            {/* Left side: Date */}
            <div className="w-20 md:w-28 shrink-0 text-right pr-4 md:pr-6 font-mono text-[10px] md:text-xs text-text-muted mt-1.5 select-none">
              {item.date}
            </div>

            {/* Middle: Bullet and Line */}
            <div className="relative flex flex-col items-center w-6 shrink-0">
              {/* Bullet dot */}
              <div className="w-3 h-3 rounded-full border-2 border-status-info bg-bg-primary group-hover:bg-status-info transition-all duration-150 z-10 mt-2" />
              
              {/* Line connector */}
              {!isLast && (
                <div className="w-[2px] bg-border-primary/40 absolute top-4 bottom-0 z-0" />
              )}
            </div>

            {/* Right side: Content */}
            <div className="flex-1 pb-8 pl-4 md:pl-6 text-left">
              <h3 className="font-sans text-sm md:text-base font-bold text-text-primary tracking-tight">
                {item.title}
              </h3>
              
              {item.subtitle && (
                <span className="block font-mono text-[10px] md:text-xs text-text-muted mt-0.5">
                  {item.subtitle}
                </span>
              )}
              
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed mt-2 whitespace-pre-wrap">
                {item.description}
              </p>

              {/* Optional Image */}
              {item.image && (
                <div className="mt-3 max-w-[240px] border border-border-primary/50 rounded overflow-hidden">
                  <img src={item.image} alt={item.imageAlt || item.title} className="w-full h-auto object-cover" />
                </div>
              )}

              {/* Technology tags */}
              {item.tech && item.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {item.tech.map((t) => (
                    <TechBadge key={t} name={t} />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
