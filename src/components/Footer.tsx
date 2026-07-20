import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="h-8 shrink-0 border-t border-border-primary bg-chrome-bg px-4 flex items-center justify-between text-[11px] font-mono text-text-muted select-none">
      <div className="flex items-center space-x-1.5" title="The portfolio runtime system is active and responsive.">
        <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
        <span className="text-text-secondary font-semibold uppercase">Runtime Operational</span>
      </div>
      <div>
        <span>&copy; {new Date().getFullYear()} Sanjai L. All rights reserved.</span>
      </div>
    </footer>
  );
};
