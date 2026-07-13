"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ESCAPE_LIMIT, POINTER_ESCAPE_RADIUS } from "@/lib/invite-types";

const MOVE_COOLDOWN_MS = 150;
const FLEE_DISTANCE_MIN = 80;
const FLEE_DISTANCE_MAX = 140;

type Props = {
  label: string;
  /** Bounding element the button must stay inside (the action area of the card). */
  boundsRef: React.RefObject<HTMLDivElement | null>;
  onReject: () => void;
};

/**
 * The playful "NO" button.
 * Jumps away up to ESCAPE_LIMIT times when a pointer enters range or presses,
 * then becomes clickable. Movement uses transform so the flex slot
 * (and the Yes button) stay fixed.
 */
export default function EscapeButton({ label, boundsRef, onReject }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const offsetRef = useRef(offset);
  const escapeCountRef = useRef(0);
  const lastMoveAtRef = useRef(0);
  const reducedMotionRef = useRef(false);
  /** Rising-edge guard so one hover/drag near the button counts as a single flee. */
  const pointerInsideRef = useRef(false);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const moveButton = useCallback(
    (pointer?: { x: number; y: number }): boolean => {
      const button = buttonRef.current;
      const bounds = boundsRef.current;
      if (!button || !bounds) return false;

      const now = Date.now();
      if (now - lastMoveAtRef.current < MOVE_COOLDOWN_MS) return false;

      try {
        const boundsRect = bounds.getBoundingClientRect();
        const btnRect = button.getBoundingClientRect();
        const current = offsetRef.current;

        // Untransformed origin of the button within bounds.
        const originLeft = btnRect.left - boundsRect.left - current.x;
        const originTop = btnRect.top - boundsRect.top - current.y;
        const maxX = boundsRect.width - btnRect.width;
        const maxY = boundsRect.height - btnRect.height;
        if (maxX <= 0 && maxY <= 0) return false;

        const cx = btnRect.left + btnRect.width / 2;
        const cy = btnRect.top + btnRect.height / 2;

        let dirX: number;
        let dirY: number;
        if (pointer) {
          dirX = cx - pointer.x;
          dirY = cy - pointer.y;
        } else {
          const angle = Math.random() * Math.PI * 2;
          dirX = Math.cos(angle);
          dirY = Math.sin(angle);
        }

        const len = Math.hypot(dirX, dirY);
        if (len < 0.001) {
          const angle = Math.random() * Math.PI * 2;
          dirX = Math.cos(angle);
          dirY = Math.sin(angle);
        } else {
          dirX /= len;
          dirY /= len;
        }

        const distance =
          FLEE_DISTANCE_MIN +
          Math.random() * (FLEE_DISTANCE_MAX - FLEE_DISTANCE_MIN);

        let nextLeft = originLeft + current.x + dirX * distance;
        let nextTop = originTop + current.y + dirY * distance;
        nextLeft = Math.min(Math.max(0, nextLeft), Math.max(maxX, 0));
        nextTop = Math.min(Math.max(0, nextTop), Math.max(maxY, 0));

        // If clamped against an edge and still near the pointer, try a side step.
        const nextCx = boundsRect.left + nextLeft + btnRect.width / 2;
        const nextCy = boundsRect.top + nextTop + btnRect.height / 2;
        if (
          pointer &&
          Math.hypot(pointer.x - nextCx, pointer.y - nextCy) <
            POINTER_ESCAPE_RADIUS
        ) {
          const side = Math.random() < 0.5 ? 1 : -1;
          const altX = -dirY * side;
          const altY = dirX * side;
          nextLeft = originLeft + current.x + altX * distance;
          nextTop = originTop + current.y + altY * distance;
          nextLeft = Math.min(Math.max(0, nextLeft), Math.max(maxX, 0));
          nextTop = Math.min(Math.max(0, nextTop), Math.max(maxY, 0));
        }

        lastMoveAtRef.current = now;
        setOffset({
          x: nextLeft - originLeft,
          y: nextTop - originTop,
        });
        return true;
      } catch {
        setOffset({ x: 0, y: 0 });
        return false;
      }
    },
    [boundsRef]
  );

  const tryEscape = useCallback(
    (pointer?: { x: number; y: number }) => {
      if (escapeCountRef.current >= ESCAPE_LIMIT) return false;
      if (reducedMotionRef.current) {
        escapeCountRef.current += 1;
        return true;
      }
      if (!moveButton(pointer)) return false;
      escapeCountRef.current += 1;
      return true;
    },
    [moveButton]
  );

  // Mouse + touch: one flee per time the pointer enters the radius.
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const button = buttonRef.current;
      if (!button || escapeCountRef.current >= ESCAPE_LIMIT) return;
      const rect = button.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const inside =
        Math.hypot(e.clientX - cx, e.clientY - cy) < POINTER_ESCAPE_RADIUS;
      if (!inside) {
        pointerInsideRef.current = false;
        return;
      }
      if (pointerInsideRef.current) return;
      pointerInsideRef.current = true;
      tryEscape({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, [tryEscape]);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (escapeCountRef.current >= ESCAPE_LIMIT) return;
    // Suppress the synthetic click from this gesture so cooldown failure
    // on click cannot accidentally call onReject after a successful flee.
    e.preventDefault();
    pointerInsideRef.current = true;
    tryEscape({ x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    // Still within flee quota: never reject. (Cooldown / failed move must
    // not be treated as "ready to click" — that broke the 2nd mobile tap.)
    if (escapeCountRef.current < ESCAPE_LIMIT) {
      tryEscape();
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
        offset.x !== 0 || offset.y !== 0
          ? { transform: `translate(${offset.x}px, ${offset.y}px)` }
          : undefined
      }
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
