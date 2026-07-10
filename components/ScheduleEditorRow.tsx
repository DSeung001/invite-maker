"use client";

import { useState } from "react";
import TimeWheelPicker from "@/components/TimeWheelPicker";
import { EditorUi } from "@/lib/invite-i18n";
import { LIMITS, Schedule } from "@/lib/invite-types";
import {
  formatTime,
  isSameTimes,
  parseTime,
  TIME_PRESETS,
} from "@/lib/schedule-time";

type Props = {
  schedule: Schedule;
  index: number;
  today: string;
  canCopy: boolean;
  ui: EditorUi;
  timePresetLabels: Record<(typeof TIME_PRESETS)[number]["id"], string>;
  onDateChange: (date: string) => void;
  onRemove: () => void;
  onApplyPreset: (times: string[]) => void;
  onClearTimes: () => void;
  onAddTime: (time: string) => void;
  onRemoveTime: (time: string) => void;
  onCopyTimes: () => void;
};

export default function ScheduleEditorRow({
  schedule,
  index,
  today,
  canCopy,
  ui,
  timePresetLabels,
  onDateChange,
  onRemove,
  onApplyPreset,
  onClearTimes,
  onAddTime,
  onRemoveTime,
  onCopyTimes,
}: Props) {
  const defaultDraft = schedule.times[0] ?? "18:00";
  const [draftTime, setDraftTime] = useState(defaultDraft);

  const { hour, minute } = parseTime(draftTime);
  const draftFormatted = formatTime(hour, minute);
  const isDuplicate = schedule.times.includes(draftFormatted);
  const atMax = schedule.times.length >= LIMITS.maxTimesPerDate;
  const canAdd = !isDuplicate && !atMax;

  return (
    <div className="schedule-editor">
      <div className="schedule-editor-head">
        <input
          type="date"
          value={schedule.date}
          min={today}
          onChange={(e) => onDateChange(e.target.value)}
          aria-label={ui.dateAriaLabel(index + 1)}
        />
        <button
          type="button"
          className="btn-remove"
          aria-label={ui.removeDateAriaLabel}
          onClick={onRemove}
        >
          ✕
        </button>
      </div>

      <div className="quick-action-row">
        {TIME_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={`option-chip small${
              isSameTimes(
                schedule.times,
                preset.times.slice(0, LIMITS.maxTimesPerDate)
              )
                ? " selected"
                : ""
            }`}
            onClick={() => onApplyPreset([...preset.times])}
          >
            {timePresetLabels[preset.id]}
          </button>
        ))}
        <button type="button" className="option-chip small" onClick={onClearTimes}>
          {ui.clearTimes}
        </button>
      </div>

      {schedule.times.length > 0 ? (
        <div className="time-slot-chips" aria-label={ui.selectedTimesAriaLabel}>
          {schedule.times.map((time) => (
            <button
              key={time}
              type="button"
              className="time-slot-chip"
              aria-label={ui.removeTimeAriaLabel(time)}
              onClick={() => onRemoveTime(time)}
            >
              <span>{time}</span>
              <span className="time-slot-chip-remove" aria-hidden>
                ✕
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="hint schedule-time-empty">{ui.scheduleTimeEmpty}</p>
      )}

      <div className="time-wheel-panel">
        <TimeWheelPicker value={draftTime} onChange={setDraftTime} />
        <button
          type="button"
          className="btn btn-secondary time-add-btn"
          disabled={!canAdd}
          onClick={() => onAddTime(draftFormatted)}
        >
          {isDuplicate
            ? ui.addTimeDuplicate
            : atMax
              ? ui.addTimeMax(LIMITS.maxTimesPerDate)
              : ui.addTime(draftFormatted)}
        </button>
      </div>

      <div className="quick-action-row">
        <button
          type="button"
          className="btn btn-secondary schedule-copy-btn"
          disabled={!canCopy || schedule.times.length === 0}
          onClick={onCopyTimes}
        >
          {ui.copyTimesToOtherDates}
        </button>
      </div>

      <p className="hint">
        {ui.selectedTimesHint(
          schedule.times.length,
          LIMITS.maxTimesPerDate,
          schedule.times.length > 0 ? schedule.times.join(", ") : ""
        )}
      </p>
    </div>
  );
}
