export const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

const TIME_INDEX = new Map(TIME_OPTIONS.map((t, i) => [t, i]));

export function createTimeRange(start: string, end: string): string[] {
  const startIndex = TIME_INDEX.get(start);
  const endIndex = TIME_INDEX.get(end);
  if (startIndex === undefined || endIndex === undefined || startIndex > endIndex) {
    return [];
  }
  return TIME_OPTIONS.slice(startIndex, endIndex + 1);
}

export const TIME_PRESETS = [
  { id: "lunch" as const, times: createTimeRange("11:30", "14:00") },
  { id: "afternoon" as const, times: createTimeRange("14:00", "17:00") },
  { id: "evening" as const, times: createTimeRange("18:00", "21:00") },
] as const;

export const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, "0")
);

export const MINUTE_OPTIONS = ["00", "30"] as const;

export function isSameTimes(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((time, index) => time === b[index]);
}

export function parseTime(value: string): { hour: string; minute: string } {
  const [hour = "18", minute = "00"] = value.split(":");
  const normalizedMinute = MINUTE_OPTIONS.includes(minute as "00" | "30")
    ? minute
    : minute < "30"
      ? "00"
      : "30";
  return {
    hour: HOUR_OPTIONS.includes(hour) ? hour : "18",
    minute: normalizedMinute,
  };
}

export function formatTime(hour: string, minute: string): string {
  return `${hour}:${minute}`;
}
