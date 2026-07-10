import {
  InviteData,
  InviteImage,
  LIMITS,
  SAMPLE_IMAGE_IDS,
  Schedule,
} from "./invite-types";
import { isSupportedLanguage } from "./invite-i18n";

const SAMPLE_IDS = new Set<string>(SAMPLE_IMAGE_IDS);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;
const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|svg|avif|bmp)(\?.*)?$/i;

export function isValidImageUrl(url: string): boolean {
  if (!url || url.length > LIMITS.imageUrl) return false;
  const trimmed = url.trim();
  if (!/^https:\/\//i.test(trimmed)) return false;
  try {
    return IMAGE_EXT_RE.test(new URL(trimmed).pathname);
  } catch {
    return false;
  }
}

export function sanitizeImage(image: unknown): InviteImage {
  const fallback: InviteImage = { type: "sample", value: "sample-01" };
  if (!image || typeof image !== "object") return fallback;
  const img = image as { type?: unknown; value?: unknown };
  if (img.type === "sample" && typeof img.value === "string" && SAMPLE_IDS.has(img.value)) {
    return { type: "sample", value: img.value };
  }
  if (img.type === "url" && typeof img.value === "string" && isValidImageUrl(img.value)) {
    return { type: "url", value: img.value };
  }
  return fallback;
}

/** Removes duplicate dates/times, drops invalid entries, enforces limits. */
export function normalizeSchedules(schedules: Schedule[]): Schedule[] {
  const seenDates = new Set<string>();
  const result: Schedule[] = [];
  for (const s of schedules) {
    if (!s || !DATE_RE.test(s.date) || seenDates.has(s.date)) continue;
    const times = Array.from(
      new Set((s.times ?? []).filter((t) => TIME_RE.test(t)))
    ).slice(0, LIMITS.maxTimesPerDate);
    if (times.length === 0) continue;
    seenDates.add(s.date);
    result.push({ date: s.date, times });
    if (result.length >= LIMITS.maxDates) break;
  }
  return result;
}

/**
 * Validates a decoded invite payload. Returns a sanitized InviteData
 * or null when the payload cannot be rendered safely.
 */
export function validateInvite(raw: unknown): InviteData | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Partial<InviteData>;
  if (data.version !== 1) return null;
  if (!data.text || typeof data.text !== "object") return null;

  const language = isSupportedLanguage(data.language) ? data.language : "ko";

  const textFields = [
    "question",
    "yesLabel",
    "noLabel",
    "yesTitle",
    "yesDescription",
    "nextButton",
    "scheduleTitle",
    "foodTitle",
    "finalTitle",
    "finalLetter",
    "rejectTitle",
    "rejectDescription",
  ] as const;

  const text = {} as InviteData["text"];
  for (const field of textFields) {
    const value = (data.text as Record<string, unknown>)[field];
    if (typeof value !== "string") return null;
    text[field] = value.slice(0, 500);
  }

  const schedules = normalizeSchedules(
    Array.isArray(data.schedules) ? data.schedules : []
  );
  if (schedules.length === 0) return null;

  const foods = (Array.isArray(data.foods) ? data.foods : [])
    .filter(
      (f) =>
        f &&
        typeof f.icon === "string" &&
        typeof f.label === "string" &&
        f.label.length <= LIMITS.foodLabel
    )
    .slice(0, LIMITS.maxFoods);
  if (foods.length < LIMITS.minFoods) return null;

  return {
    version: 1,
    language,
    image: sanitizeImage(data.image),
    text,
    schedules,
    foods,
    timezone: "Asia/Seoul",
  };
}
