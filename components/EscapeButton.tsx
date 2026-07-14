"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { REJECT_EVENT_UI } from "@/lib/invite-i18n";
import {
  pickRandomEvent,
  runRejectEvent,
  type PointerPos,
  type RejectEventApi,
} from "@/lib/reject-events";
import {
  ESCAPE_LIMIT,
  POINTER_ESCAPE_RADIUS,
  type InviteLanguage,
} from "@/lib/invite-types";

const MOVE_COOLDOWN_MS = 150;
const EVENT_COOLDOWN_MS = 550;
const FLEE_DISTANCE_MIN = 80;
const FLEE_DISTANCE_MAX = 140;
const AVOID_PADDING = 10;
const TOAST_MS = 1000;

type AvoidRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

function overlaps(
  left: number,
  top: number,
  w: number,
  h: number,
  avoid: AvoidRect
) {
  return !(
    left + w <= avoid.left ||
    left >= avoid.right ||
    top + h <= avoid.top ||
    top >= avoid.bottom
  );
}

type Props = {
  label: string;
  language: InviteLanguage;
  /** Bounding element the button must stay inside (the action area of the card). */
  boundsRef: React.RefObject<HTMLDivElement | null>;
  /** Element the escape button must not cover (the Yes button). */
  avoidRef: React.RefObject<HTMLButtonElement | null>;
  onReject: () => void;
};

/**
 * Playful "NO" button with an extensible reject-event registry.
 * Up to ESCAPE_LIMIT attempts each run a random event (flee / shake toast),
 * then the button becomes clickable.
 */
export default function EscapeButton({
  label,
  language,
  boundsRef,
  avoidRef,
  onReject,
}: Props) {
  const ui = REJECT_EVENT_UI[language];
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const offsetRef = useRef(offset);
  const escapeCountRef = useRef(0);
  const lastMoveAtRef = useRef(0);
  const lastEventAtRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const pointerInsideRef = useRef(false);
  const suppressClickRef = useRef(false);
  const toastLineIndexRef = useRef(0);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [toastText, setToastText] = useState<string | null>(null);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const moveButton = useCallback(
    (pointer?: PointerPos): boolean => {
      const button = buttonRef.current;
      const bounds = boundsRef.current;
      if (!button || !bounds) return false;

      const now = Date.now();
      if (now - lastMoveAtRef.current < MOVE_COOLDOWN_MS) return false;

      try {
        const boundsRect = bounds.getBoundingClientRect();
        const btnRect = button.getBoundingClientRect();
        const current = offsetRef.current;

        const originLeft = btnRect.left - boundsRect.left - current.x;
        const originTop = btnRect.top - boundsRect.top - current.y;
        const maxX = boundsRect.width - btnRect.width;
        const maxY = boundsRect.height - btnRect.height;
        if (maxX <= 0 && maxY <= 0) return false;

        const avoidEl = avoidRef.current;
        let avoid: AvoidRect | null = null;
        if (avoidEl) {
          const avoidRect = avoidEl.getBoundingClientRect();
          avoid = {
            left: avoidRect.left - boundsRect.left - AVOID_PADDING,
            top: avoidRect.top - boundsRect.top - AVOID_PADDING,
            right: avoidRect.right - boundsRect.left + AVOID_PADDING,
            bottom: avoidRect.bottom - boundsRect.top + AVOID_PADDING,
          };
        }

        const clamp = (left: number, top: number) => ({
          left: Math.min(Math.max(0, left), Math.max(maxX, 0)),
          top: Math.min(Math.max(0, top), Math.max(maxY, 0)),
        });

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

        let { left: nextLeft, top: nextTop } = clamp(
          originLeft + current.x + dirX * distance,
          originTop + current.y + dirY * distance
        );

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
          ({ left: nextLeft, top: nextTop } = clamp(
            originLeft + current.x + altX * distance,
            originTop + current.y + altY * distance
          ));
        }

        if (
          avoid &&
          overlaps(nextLeft, nextTop, btnRect.width, btnRect.height, avoid)
        ) {
          do {
            nextLeft = Math.random() * Math.max(maxX, 0);
            nextTop = Math.random() * Math.max(maxY, 0);
          } while (
            overlaps(nextLeft, nextTop, btnRect.width, btnRect.height, avoid)
          );
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
    [avoidRef, boundsRef]
  );

  const playShakeToast = useCallback(() => {
    const lines = ui.toastLines;
    const idx = toastLineIndexRef.current % lines.length;
    toastLineIndexRef.current += 1;
    setToastText(lines[idx] ?? lines[0]);

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastText(null), TOAST_MS);

    if (!reducedMotionRef.current) {
      const btn = buttonRef.current;
      if (btn) {
        btn.classList.remove("reject-shake");
        void btn.offsetWidth;
        btn.classList.add("reject-shake");
      }
    }
  }, [ui.toastLines]);

  const eventApiRef = useRef<RejectEventApi>({
    runFlee: () => false,
    playShakeToast: () => {},
  });
  eventApiRef.current = {
    runFlee: (pointer) => {
      if (reducedMotionRef.current) return true;
      return moveButton(pointer);
    },
    playShakeToast,
  };

  const tryEscape = useCallback((pointer?: PointerPos) => {
    if (escapeCountRef.current >= ESCAPE_LIMIT) return false;
    const now = Date.now();
    // One physical gesture often fires pointermove + pointerdown + click;
    // count only once per cooldown window so the user gets a full 5 events.
    if (now - lastEventAtRef.current < EVENT_COOLDOWN_MS) return false;

    const id = pickRandomEvent();
    const ok = runRejectEvent(id, eventApiRef.current, pointer);
    if (!ok) return false;
    lastEventAtRef.current = now;
    escapeCountRef.current += 1;
    return true;
  }, []);

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
    e.preventDefault();
    pointerInsideRef.current = true;
    suppressClickRef.current = true;
    tryEscape({ x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    if (escapeCountRef.current < ESCAPE_LIMIT) {
      tryEscape();
      return;
    }
    onReject();
  };

  return (
    <div
      className="escape-btn-wrap"
      style={
        offset.x !== 0 || offset.y !== 0
          ? { transform: `translate(${offset.x}px, ${offset.y}px)` }
          : undefined
      }
    >
      <button
        ref={buttonRef}
        type="button"
        className="btn btn-secondary escape-btn"
        onPointerDown={handlePointerDown}
        onClick={handleClick}
      >
        {label}
      </button>

      {toastText && (
        <div className="reject-toast" role="status">
          {toastText}
        </div>
      )}
    </div>
  );
}
