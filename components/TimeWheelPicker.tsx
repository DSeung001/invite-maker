"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  formatTime,
  HOUR_OPTIONS,
  MINUTE_OPTIONS,
  parseTime,
} from "@/lib/schedule-time";

const ITEM_HEIGHT = 40;
const VISIBLE_ROWS = 5;
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ROWS;
const PADDING_ROWS = Math.floor(VISIBLE_ROWS / 2);

type Props = {
  value: string;
  onChange: (time: string) => void;
};

function WheelColumn({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  const columnRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncingRef = useRef(false);

  const scrollToIndex = useCallback((index: number, smooth = false) => {
    const column = columnRef.current;
    if (!column) return;
    syncingRef.current = true;
    column.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: smooth ? "smooth" : "auto",
    });
    requestAnimationFrame(() => {
      syncingRef.current = false;
    });
  }, []);

  const readIndex = useCallback(() => {
    const column = columnRef.current;
    if (!column) return 0;
    return Math.round(column.scrollTop / ITEM_HEIGHT);
  }, []);

  const emitSelection = useCallback(() => {
    const index = Math.max(0, Math.min(options.length - 1, readIndex()));
    onSelect(options[index] ?? options[0]);
  }, [onSelect, options, readIndex]);

  const handleScroll = useCallback(() => {
    if (syncingRef.current) return;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(emitSelection, 80);
  }, [emitSelection]);

  const handleScrollEnd = useCallback(() => {
    if (syncingRef.current) return;
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
    emitSelection();
  }, [emitSelection]);

  useEffect(() => {
    const index = options.indexOf(selected);
    if (index >= 0) scrollToIndex(index);
  }, [options, scrollToIndex, selected]);

  useEffect(() => {
    const column = columnRef.current;
    if (!column) return;
    column.addEventListener("scrollend", handleScrollEnd);
    return () => {
      column.removeEventListener("scrollend", handleScrollEnd);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [handleScrollEnd]);

  const moveBy = (delta: number) => {
    const nextIndex = Math.max(0, Math.min(options.length - 1, readIndex() + delta));
    scrollToIndex(nextIndex, true);
    onSelect(options[nextIndex] ?? options[0]);
  };

  return (
    <div
      className="time-wheel-column-wrap"
      role="group"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          moveBy(-1);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          moveBy(1);
        }
      }}
    >
      <div
        ref={columnRef}
        className="time-wheel-column"
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`wheel-${label}-${selected}`}
        onScroll={handleScroll}
        style={{ height: WHEEL_HEIGHT }}
      >
        {Array.from({ length: PADDING_ROWS }).map((_, i) => (
          <div key={`pad-top-${i}`} className="time-wheel-item time-wheel-spacer" aria-hidden />
        ))}
        {options.map((option) => (
          <div
            key={option}
            id={`wheel-${label}-${option}`}
            className={`time-wheel-item${option === selected ? " selected" : ""}`}
            role="option"
            aria-selected={option === selected}
          >
            {option}
          </div>
        ))}
        {Array.from({ length: PADDING_ROWS }).map((_, i) => (
          <div key={`pad-bottom-${i}`} className="time-wheel-item time-wheel-spacer" aria-hidden />
        ))}
      </div>
    </div>
  );
}

export default function TimeWheelPicker({ value, onChange }: Props) {
  const { hour, minute } = parseTime(value);

  return (
    <div className="time-wheel-wrap" aria-label="시간 선택">
      <div className="time-wheel-highlight" aria-hidden />
      <div className="time-wheel-columns">
        <WheelColumn
          label="시"
          options={HOUR_OPTIONS}
          selected={hour}
          onSelect={(nextHour) => onChange(formatTime(nextHour, minute))}
        />
        <span className="time-wheel-separator" aria-hidden>
          :
        </span>
        <WheelColumn
          label="분"
          options={MINUTE_OPTIONS}
          selected={minute}
          onSelect={(nextMinute) => onChange(formatTime(hour, nextMinute))}
        />
      </div>
    </div>
  );
}
