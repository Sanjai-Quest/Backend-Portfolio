import React from "react";
import { Loader2 } from "lucide-react";
import { useReducedMotion } from "framer-motion";

// 1. Loading Skeleton Component
interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = "100%",
  height = "16px",
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion is requested, use static background. Otherwise, use standard pulsing.
  const animationClass = shouldReduceMotion ? "" : "animate-pulse";

  return (
    <div
      className={`bg-border-primary/45 rounded ${animationClass} ${className}`}
      style={{
        width,
        height,
      }}
    />
  );
};

// 2. Loading Spinner Component
interface LoadingSpinnerProps {
  size?: number;
  label?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  label,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Disable rotation animation if user requested reduced motion
  const spinnerClass = shouldReduceMotion ? "text-status-info" : "animate-spin text-status-info";

  return (
    <div className={`flex flex-col items-center justify-center space-y-2.5 ${className}`}>
      <Loader2 size={size} className={spinnerClass} />
      {label && (
        <span className="font-mono text-[10px] md:text-xs text-text-muted select-none">
          {label}
        </span>
      )}
    </div>
  );
};
