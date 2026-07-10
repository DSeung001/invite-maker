"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DESKTOP_ESCAPE_DURATION_MS,
  MOBILE_ESCAPE_LIMIT,
  POINTER_ESCAPE_RADIUS,
} from "@/lib/invite-types";

type Props = {
  label: string;
  /** Bounding element the button must stay inside (the action area of the card). */
  boundsRef: React.RefObject<HTMLDivElement | null>;
  onReject: () => void;
};

/**
 * The playful "NO" button.
 * - Touch/keyboard: ignores activation and jumps up to MOBILE_ESCAPE_LIMIT times,
 *   then becomes clickable.
 * - Pointer (desktop): jumps away when the cursor gets within POINTER_ESCAPE_RADIUS,
 *   for at most DESKTOP_ESCAPE_DURATION_MS after the first jump, then stays put.
 */
export default function EscapeButton({ label, boundsRef, onReject }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const tapCountRef = useRef(0);
  const firstMoveAtRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const desktopExpired = () =>
    firstMoveAtRef.current !== null &&
    Date.now() - firstMoveAtRef.current > DESKTOP_ESCAPE_DURATION_MS;

  const moveButton = useCallback(() => {
    const button = buttonRef.current;
    const bounds = boundsRef.current;
    if (!button || !bounds) return;

    try {
      const boundsRect = bounds.getBoundingClientRect();
      const btnRect = button.getBoundingClientRect();
      const maxX = boundsRect.width - btnRect.width;
      const maxY = boundsRect.height - btnRect.height;
      if (maxX <= 0 && maxY <= 0) return;

      // Random position inside the bounds, biased away from current spot.
      for (let attempt = 0; attempt < 8; attempt++) {
        const x = Math.random() * Math.max(maxX, 0);
        const y = Math.random() * Math.max(maxY, 0);
        const currentX = btnRect.left - boundsRect.left;
        const currentY = btnRect.top - boundsRect.top;
        const dist = Math.hypot(x - currentX, y - currentY);
        if (dist > btnRect.width * 0.8 || attempt === 7) {
          setOffset({ x, y });
          return;
        }
      }
    } catch {
      setOffset(null); // recover to the default position
    }
  }, [boundsRef]);

  // Desktop: escape when the pointer approaches.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const button = buttonRef.current;
      if (!button || desktopExpired()) return;
      const rect = button.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      if (Math.hypot(e.clientX - cx, e.clientY - cy) < POINTER_ESCAPE_RADIUS) {
        if (firstMoveAtRef.current === null) firstMoveAtRef.current = Date.now();
        if (!reducedMotionRef.current) moveButton();
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [moveButton]);

  const handleClick = () => {
    // Touch/keyboard path: dodge a limited number of times, then allow reject.
    if (tapCountRef.current < MOBILE_ESCAPE_LIMIT) {
      tapCountRef.current += 1;
      if (!reducedMotionRef.current) moveButton();
      return;
    }
    onReject();
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className="btn btn-secondary escape-btn"
      style={
        offset
          ? {
              position: "absolute",
              left: offset.x,
              top: offset.y,
              margin: 0,
            }
          : undefined
      }
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
