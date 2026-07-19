import React from "react";

interface InfoCardProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon: Icon,
  children,
  className = "",
}) => {
  return (
    <div
      className={`relative bg-bg-secondary/40 border border-border-primary p-5 rounded-lg text-left hover:border-border-primary/100 hover:bg-card-bg/20 transition-all duration-150 ${className}`}
    >
      {/* Schematic Corner Brackets in signature orange color */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-signature rounded-tl-[3px] opacity-75"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-signature rounded-tr-[3px] opacity-75"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-signature rounded-bl-[3px] opacity-75"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-signature rounded-br-[3px] opacity-75"></div>
      
      <div className="flex flex-col space-y-3">
        {/* Title section with border divider */}
        <div className="flex items-center space-x-2 border-b border-border-primary/40 pb-2">
          {Icon && <Icon className="w-4 h-4 text-status-info shrink-0" />}
          <span className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider">
            {title}
          </span>
        </div>

        {/* Body content */}
        <div className="text-xs md:text-sm text-text-secondary leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};
