import { FOOD_PRESETS, TEXT_PRESETS } from "./invite-defaults";
import type {
  FoodOption,
  InviteData,
  InviteImage,
  InviteLanguage,
  InviteText,
  Schedule,
} from "./invite-types";
import { SAMPLE_IMAGE_IDS } from "./invite-types";
import { isSupportedLanguage } from "./invite-i18n";
import {
  DEFAULT_TIMEZONE,
  isSupportedTimezone,
  sanitizeTimezone,
} from "./invite-timezones";

const TEXT_KEYS = [
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
] as const satisfies readonly (keyof InviteText)[];

const SAMPLE_ID_SET = new Set<string>(SAMPLE_IMAGE_IDS);

export type CompactFood = number | { i: string; l: string };

export type CompactInvite = {
  v: 2;
  l: InviteLanguage;
  /** Sample suffix like "01", or `{ u: url }` for custom images. */
  i: string | { u: string };
  t?: Partial<InviteText>;
  s: [string, string[]][];
  f: CompactFood[];
  /** IANA timezone; omitted when equal to the language default. */
  tz?: string;
};

function sampleSuffix(id: string): string | null {
  const match = /^sample-(\d{2})$/.exec(id);
  return match ? match[1] : null;
}

function compactImage(image: InviteImage): CompactInvite["i"] {
  if (image.type === "sample") {
    return sampleSuffix(image.value) ?? "01";
  }
  return { u: image.value };
}

function expandImage(i: CompactInvite["i"]): InviteImage {
  if (typeof i === "string") {
    const id = `sample-${i.padStart(2, "0")}`;
    if (SAMPLE_ID_SET.has(id)) return { type: "sample", value: id };
    return { type: "sample", value: "sample-01" };
  }
  if (i && typeof i === "object" && typeof i.u === "string") {
    return { type: "url", value: i.u };
  }
  return { type: "sample", value: "sample-01" };
}

function compactText(
  text: InviteText,
  language: InviteLanguage
): Partial<InviteText> | undefined {
  const preset = TEXT_PRESETS[language];
  const delta: Partial<InviteText> = {};
  let changed = false;
  for (const key of TEXT_KEYS) {
    if (text[key] !== preset[key]) {
      delta[key] = text[key];
      changed = true;
    }
  }
  return changed ? delta : undefined;
}

function expandText(
  language: InviteLanguage,
  delta: Partial<InviteText> | undefined
): InviteText {
  return { ...TEXT_PRESETS[language], ...delta };
}

function foodPresetIndex(
  food: FoodOption,
  language: InviteLanguage
): number | null {
  const presets = FOOD_PRESETS[language];
  const index = presets.findIndex(
    (p) => p.icon === food.icon && p.label === food.label
  );
  return index >= 0 ? index : null;
}

function compactFoods(
  foods: FoodOption[],
  language: InviteLanguage
): CompactFood[] {
  return foods.map((food) => {
    const index = foodPresetIndex(food, language);
    if (index !== null) return index;
    return { i: food.icon, l: food.label };
  });
}

function expandFoods(
  foods: CompactFood[],
  language: InviteLanguage
): FoodOption[] {
  const presets = FOOD_PRESETS[language];
  return foods.map((entry) => {
    if (typeof entry === "number") {
      const preset = presets[entry];
      return preset
        ? { icon: preset.icon, label: preset.label }
        : { icon: "🍕", label: "" };
    }
    if (entry && typeof entry === "object") {
      return {
        icon: typeof entry.i === "string" ? entry.i : "🍕",
        label: typeof entry.l === "string" ? entry.l : "",
      };
    }
    return { icon: "🍕", label: "" };
  });
}

function compactSchedules(schedules: Schedule[]): CompactInvite["s"] {
  return schedules.map((s) => [s.date, s.times]);
}

function expandSchedules(s: CompactInvite["s"]): Schedule[] {
  if (!Array.isArray(s)) return [];
  return s
    .filter(
      (row): row is [string, string[]] =>
        Array.isArray(row) &&
        typeof row[0] === "string" &&
        Array.isArray(row[1])
    )
    .map(([date, times]) => ({
      date,
      times: times.filter((t): t is string => typeof t === "string"),
    }));
}

export function toCompact(data: InviteData): CompactInvite {
  const compact: CompactInvite = {
    v: 2,
    l: data.language,
    i: compactImage(data.image),
    s: compactSchedules(data.schedules),
    f: compactFoods(data.foods, data.language),
  };
  const textDelta = compactText(data.text, data.language);
  if (textDelta) compact.t = textDelta;
  if (
    isSupportedTimezone(data.timezone) &&
    data.timezone !== DEFAULT_TIMEZONE[data.language]
  ) {
    compact.tz = data.timezone;
  }
  return compact;
}

export function fromCompact(raw: unknown): InviteData {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid compact invite");
  }
  const c = raw as Partial<CompactInvite>;
  if (c.v !== 2) throw new Error("Unsupported compact version");
  const language = isSupportedLanguage(c.l) ? c.l : "ko";

  return {
    version: 1,
    language,
    image: expandImage(c.i ?? "01"),
    text: expandText(
      language,
      c.t && typeof c.t === "object" ? (c.t as Partial<InviteText>) : undefined
    ),
    schedules: expandSchedules(Array.isArray(c.s) ? c.s : []),
    foods: expandFoods(Array.isArray(c.f) ? c.f : [], language),
    timezone: sanitizeTimezone(c.tz ?? DEFAULT_TIMEZONE[language], language),
  };
}
