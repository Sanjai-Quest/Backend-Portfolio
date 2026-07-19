import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface RequestPacketProps {
  startCoords: { x: number; y: number };
  endCoords: { x: number; y: number };
  trigger: boolean;
  onComplete?: () => void;
  duration?: number;
  color?: string; // e.g. "bg-status-info" or "bg-status-success"
}

export const RequestPacket: React.FC<RequestPacketProps> = ({
  startCoords,
  endCoords,
  trigger,
  onComplete,
  duration = 0.6,
  color = "bg-status-info",
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (trigger && shouldReduceMotion && onComplete) {
      // In reduced motion mode, instantly trigger completion callback
      const timer = setTimeout(() => {
        onComplete();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [trigger, shouldReduceMotion, onComplete]);

  if (!trigger) return null;

  // If the user has requested reduced motion, we render the packet statically or bypass animation
  if (shouldReduceMotion) {
    return (
      <div
        className={`absolute w-2.5 h-2.5 rounded-[3px] shadow-[0_0_8px_rgba(59,130,246,0.6)] pointer-events-none -translate-x-1/2 -translate-y-1/2 ${color}`}
        style={{
          left: `${endCoords.x}px`,
          top: `${endCoords.y}px`,
        }}
      />
    );
  }

  return (
    <motion.div
      initial={{
        left: `${startCoords.x}px`,
        top: `${startCoords.y}px`,
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        left: [`${startCoords.x}px`, `${startCoords.x}px`, `${endCoords.x}px`],
        top: [`${startCoords.y}px`, `${startCoords.y}px`, `${endCoords.y}px`],
        opacity: [0, 1, 1],
        scale: [0.8, 1, 1],
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
      }}
      transition={{
        duration: duration,
        times: [0, 0.15, 1],
        ease: "linear",
      }}
      onAnimationComplete={() => {
        if (onComplete) {
          onComplete();
        }
      }}
      className={`absolute w-2.5 h-2.5 rounded-[3px] shadow-[0_0_8px_rgba(59,130,246,0.5)] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 ${color}`}
    />
  );
};
