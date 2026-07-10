"use client";

/**
 * Fullscreen photo lightbox for POI galleries. Dependency-free: dark overlay,
 * arrow + swipe navigation, Escape to close, caption line, focus-trapped.
 * The world engine is told a modal is open (setModalOpen) so keys/clicks in
 * here never move the hiker.
 */

import { useCallback, useEffect, useRef } from "react";

export interface LightboxProps {
  images: string[];
  index: number;
  /** Section name for alt text / the caption line (e.g. "Photography"). */
  label: string;
  caption?: string;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

export function Lightbox({ images, index, label, caption, onNavigate, onClose }: LightboxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<Element | null>(null);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const count = images.length;

  const prev = useCallback(
    () => onNavigate((index - 1 + count) % count),
    [index, count, onNavigate],
  );
  const next = useCallback(() => onNavigate((index + 1) % count), [index, count, onNavigate]);

  useEffect(() => {
    restoreRef.current = document.activeElement;
    rootRef.current?.querySelector<HTMLButtonElement>(".lbClose")?.focus();
    return () => {
      if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus();
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
    } else if (e.key === "ArrowLeft" && count > 1) prev();
    else if (e.key === "ArrowRight" && count > 1) next();
    else if (e.key === "Tab") {
      // Focus trap: cycle within the lightbox's buttons.
      const btns = Array.from(
        rootRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [],
      );
      if (btns.length === 0) return;
      const i = btns.indexOf(document.activeElement as HTMLButtonElement);
      const nextI = e.shiftKey ? (i <= 0 ? btns.length - 1 : i - 1) : (i + 1) % btns.length;
      btns[nextI].focus();
      e.preventDefault();
    }
  };

  return (
    <div
      ref={rootRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${label} photos`}
      onKeyDown={onKeyDown}
      onPointerDown={(e) => {
        swipeRef.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const start = swipeRef.current;
        swipeRef.current = null;
        if (!start || count < 2) return;
        const dx = e.clientX - start.x;
        if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(e.clientY - start.y)) {
          if (dx < 0) next();
          else prev();
        }
      }}
      onClick={(e) => {
        // Click on the dark backdrop (not the photo or a control) closes.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <img className="lbImg" src={images[index]} alt={`${label} photo ${index + 1} of ${count}`} />
      <button className="lbClose" aria-label="Close photos" onClick={onClose}>
        ✕
      </button>
      {count > 1 && (
        <>
          <button className="lbArrow lbPrev" aria-label="Previous photo" onClick={prev}>
            ‹
          </button>
          <button className="lbArrow lbNext" aria-label="Next photo" onClick={next}>
            ›
          </button>
        </>
      )}
      <div className="lbCap">
        {caption ? `${caption} ` : ""}
        {index + 1} / {count}
      </div>
    </div>
  );
}
