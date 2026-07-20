import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export interface LogItem {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  message: string;
}

interface TerminalLogProps {
  logs: LogItem[];
  maxHeight?: string;
  className?: string;
}

export const TerminalLog: React.FC<TerminalLogProps> = ({
  logs,
  maxHeight = "300px",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll internally to bottom when logs are updated, avoiding global viewport jumping
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const levelColorMap = {
    INFO: "text-status-info",
    WARN: "text-status-warning",
    ERROR: "text-status-error",
  };

  return (
    <div
      ref={containerRef}
      className={`font-mono text-[11px] md:text-xs text-text-secondary bg-card-bg border border-border-primary rounded-lg overflow-y-auto p-4 flex flex-col space-y-1 relative select-text ${className}`}
      style={{ maxHeight }}
    >
      <AnimatePresence initial={false}>
        {logs.map((log, idx) => (
          <motion.div
            key={`${log.timestamp}-${idx}`}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="flex items-start space-x-2 py-0.5 leading-5"
          >
            <span className="text-text-muted shrink-0">[{log.timestamp}]</span>
            <span className={`shrink-0 font-bold ${levelColorMap[log.level]}`}>
              {log.level}
            </span>
            <span className="text-text-secondary break-all">{log.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
