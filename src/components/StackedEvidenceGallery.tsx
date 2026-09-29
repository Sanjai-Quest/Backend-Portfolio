import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  tag: string;
}

interface StackedEvidenceGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export const StackedEvidenceGallery: React.FC<StackedEvidenceGalleryProps> = ({
  images,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Swipe detection refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = images.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const handleOpen = (index = 0) => {
    setCurrentIndex(index);
    setDirection(1);
    setIsOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll when lightbox is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleClose, handleNext, handlePrev]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45; // Minimum px distance for swipe gesture

    if (diff > minSwipeDistance) {
      handleNext();
    } else if (diff < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Animation variants for smooth horizontal slide & fade
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 30 },
        opacity: { duration: 0.22 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 30 },
        opacity: { duration: 0.18 },
      },
    }),
  };

  const currentImg = images[currentIndex] || images[0];

  return (
    <>
      {/* 1. COLLAPSED STACKED EVIDENCE GALLERY */}
      <div className={`mt-4 mb-2 select-none ${className}`}>
        <div
          role="button"
          tabIndex={0}
          aria-label="View stacked evidence gallery of 3 photos"
          onClick={() => handleOpen(0)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen(0);
            }
          }}
          className="group relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-signature/70 focus:ring-offset-2 focus:ring-offset-bg-primary rounded-lg inline-block w-full max-w-[340px] sm:max-w-[380px]"
        >
          {/* Container holding stacked cards with responsive height */}
          <div className="relative h-60 sm:h-64 w-full pr-6 pt-3">
            {/* Third Card (Back Layer - Team/Judge Photo) */}
            {images[2] && (
              <div
                className="absolute inset-0 top-0 left-5 right-1 h-52 sm:h-56 rounded-lg overflow-hidden border border-border-primary/40 bg-bg-secondary/80 shadow-md transform translate-x-3 -translate-y-1.5 rotate-2 transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-2.5 group-hover:rotate-3 opacity-60 pointer-events-none"
                aria-hidden="true"
              >
                <img
                  src={images[2].src}
                  alt=""
                  className="w-full h-full object-cover object-center filter brightness-[0.75]"
                  loading="lazy"
                />
              </div>
            )}

            {/* Second Card (Middle Layer - Event Photo) */}
            {images[1] && (
              <div
                className="absolute inset-0 top-1.5 left-2.5 right-3.5 h-52 sm:h-56 rounded-lg overflow-hidden border border-border-primary/60 bg-bg-secondary shadow-md transform translate-x-1.5 -translate-y-0.5 rotate-1 transition-transform duration-300 ease-out group-hover:translate-x-2.5 group-hover:-translate-y-1.5 group-hover:rotate-1.5 opacity-85 pointer-events-none"
                aria-hidden="true"
              >
                <img
                  src={images[1].src}
                  alt=""
                  className="w-full h-full object-cover object-center filter brightness-[0.85]"
                  loading="lazy"
                />
              </div>
            )}

            {/* First Card (Front Dominant Layer - Trophy Photo) */}
            {images[0] && (
              <div className="relative z-10 w-full h-52 sm:h-56 rounded-lg overflow-hidden border border-border-primary group-hover:border-signature/60 bg-bg-secondary shadow-lg transition-all duration-300 ease-out">
                <img
                  src={images[0].src}
                  alt={images[0].alt}
                  className="w-full h-full object-cover object-top filter brightness-[0.95] group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />

                {/* Monospace Badge Overlay on Front Card */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-3 flex items-end justify-between">
                  <div>
                    <div className="font-mono text-[9px] font-bold text-signature uppercase tracking-wider">
                      {images[0].tag}
                    </div>
                    <div className="font-mono text-[11px] text-text-primary font-medium truncate max-w-[220px]">
                      {images[0].caption}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-bg-primary/90 border border-border-primary/80 rounded px-2 py-0.5 text-text-secondary group-hover:text-signature group-hover:border-signature/40 transition-colors">
                    <Maximize2 className="w-3 h-3" />
                    <span className="font-mono text-[10px] font-bold">1 / {total}</span>
                  </div>
                </div>

                {/* Monospace Top Label */}
                <div className="absolute top-2.5 left-2.5 bg-bg-primary/90 border border-border-primary/80 rounded px-2 py-0.5 font-mono text-[9px] font-bold text-text-secondary uppercase tracking-wider">
                  [ STACKED GALLERY · {total} PHOTOS ]
                </div>
              </div>
            )}
          </div>

          <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-text-muted px-1">
            <span>CLICK TO EXPAND EVIDENCE VIEWER</span>
            <span className="text-signature/80 font-bold">3 PHOTOS</span>
          </div>
        </div>
      </div>

      {/* 2. EXPANDED FOCUSED VIEWER (LIGHTBOX) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 sm:p-5 md:p-8 animate-fadeIn select-none"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Evidence Photo Viewer"
        >
          {/* Main Viewer Card */}
          <div
            className="relative w-full max-w-4xl bg-modal-bg border border-border-primary rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Viewer Header Bar */}
            <div className="px-4 py-3 bg-chrome-bg/80 border-b border-border-primary flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                <span className="font-mono text-[11px] font-bold text-text-primary tracking-wider uppercase">
                  EVIDENCE VIEWER // DRESTEIN ’26
                </span>
                <span className="hidden sm:inline font-mono text-[10px] text-text-muted">
                  · AI-DS BEST EVENT
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {/* Monospace Counter */}
                <div className="font-mono text-xs font-bold text-signature bg-bg-primary/70 border border-border-primary px-2.5 py-1 rounded">
                  {currentIndex + 1} / {total}
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close evidence viewer (Esc)"
                  className="p-1 rounded text-text-secondary hover:text-text-primary hover:bg-card-hover border border-transparent hover:border-border-primary transition-all focus:outline-none focus:ring-1 focus:ring-signature flex items-center gap-1 font-mono text-xs"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline text-[10px] text-text-muted">[ESC]</span>
                </button>
              </div>
            </div>

            {/* Main Focused Image Container */}
            <div
              className="relative flex-1 bg-black/50 min-h-[300px] max-h-[58vh] sm:max-h-[64vh] flex items-center justify-center overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full flex items-center justify-center p-2 sm:p-4"
                >
                  <img
                    src={currentImg.src}
                    alt={currentImg.alt}
                    className="max-h-[52vh] sm:max-h-[58vh] max-w-full w-auto object-contain rounded border border-border-primary/40 shadow-lg"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Left Navigation Arrow */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photo (Left arrow)"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-lg bg-bg-primary/85 hover:bg-card-hover text-text-primary border border-border-primary shadow-md hover:border-signature/60 transition-all focus:outline-none focus:ring-2 focus:ring-signature"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Right Navigation Arrow */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photo (Right arrow)"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-lg bg-bg-primary/85 hover:bg-card-hover text-text-primary border border-border-primary shadow-md hover:border-signature/60 transition-all focus:outline-none focus:ring-2 focus:ring-signature"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Image Details Bar */}
            <div className="px-4 py-2.5 bg-bg-secondary/90 border-t border-border-primary flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5 text-left">
                <div className="font-mono text-[10px] font-bold text-signature uppercase tracking-wider">
                  {currentImg.tag}
                </div>
                <div className="text-xs sm:text-sm text-text-primary font-medium">
                  {currentImg.caption}
                </div>
              </div>
              <div className="font-mono text-[10px] text-text-muted select-none self-start sm:self-auto">
                USE ARROW KEYS OR SWIPE
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="p-3 bg-chrome-bg/95 border-t border-border-primary/80 flex items-center justify-center gap-3 overflow-x-auto">
              {images.map((img, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    aria-label={`Jump to photo ${idx + 1}: ${img.caption}`}
                    className={`relative rounded overflow-hidden transition-all duration-200 shrink-0 w-16 h-12 sm:w-20 sm:h-14 border ${
                      isActive
                        ? "border-signature ring-2 ring-signature/50 opacity-100 scale-105"
                        : "border-border-primary/60 opacity-55 hover:opacity-90 hover:border-text-secondary"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt=""
                      className="w-full h-full object-cover object-center"
                    />
                    <div
                      className={`absolute bottom-0 inset-x-0 font-mono text-[9px] font-bold py-0.2 text-center ${
                        isActive
                          ? "bg-signature text-bg-primary"
                          : "bg-black/70 text-text-muted"
                      }`}
                    >
                      {idx + 1} / {total}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
