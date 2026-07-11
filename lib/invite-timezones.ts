import type { InviteLanguage } from "./invite-types";

export const TIMEZONE_IDS = [
  "Asia/Seoul",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Hong_Kong",
  "Asia/Singapore",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Australia/Sydney",
  "UTC",
] as const;

export type InviteTimezone = (typeof TIMEZONE_IDS)[number];

const TIMEZONE_ID_SET = new Set<string>(TIMEZONE_IDS);

export const DEFAULT_TIMEZONE: Record<InviteLanguage, InviteTimezone> = {
  ko: "Asia/Seoul",
  en: "America/New_York",
  ja: "Asia/Tokyo",
  zh: "Asia/Shanghai",
};

const TIMEZONE_LABELS: Record<InviteTimezone, Record<InviteLanguage, string>> = {
  "Asia/Seoul": {
    ko: "한국 표준시 (서울)",
    en: "Korea Standard Time (Seoul)",
    ja: "韓国標準時（ソウル）",
    zh: "韩国标准时间（首尔）",
  },
  "Asia/Tokyo": {
    ko: "일본 표준시 (도쿄)",
    en: "Japan Standard Time (Tokyo)",
    ja: "日本標準時（東京）",
    zh: "日本标准时间（东京）",
  },
  "Asia/Shanghai": {
    ko: "중국 표준시 (상하이)",
    en: "China Standard Time (Shanghai)",
    ja: "中国標準時（上海）",
    zh: "中国标准时间（上海）",
  },
  "Asia/Hong_Kong": {
    ko: "홍콩 시간",
    en: "Hong Kong Time",
    ja: "香港時間",
    zh: "香港时间",
  },
  "Asia/Singapore": {
    ko: "싱가포르 시간",
    en: "Singapore Time",
    ja: "シンガポール時間",
    zh: "新加坡时间",
  },
  "America/New_York": {
    ko: "미국 동부 (뉴욕)",
    en: "US Eastern (New York)",
    ja: "アメリカ東部（ニューヨーク）",
    zh: "美国东部（纽约）",
  },
  "America/Chicago": {
    ko: "미국 중부 (시카고)",
    en: "US Central (Chicago)",
    ja: "アメリカ中部（シカゴ）",
    zh: "美国中部（芝加哥）",
  },
  "America/Los_Angeles": {
    ko: "미국 서부 (LA)",
    en: "US Pacific (Los Angeles)",
    ja: "アメリカ西部（ロサンゼルス）",
    zh: "美国西部（洛杉矶）",
  },
  "Europe/London": {
    ko: "영국 (런던)",
    en: "United Kingdom (London)",
    ja: "イギリス（ロンドン）",
    zh: "英国（伦敦）",
  },
  "Europe/Paris": {
    ko: "프랑스 (파리)",
    en: "France (Paris)",
    ja: "フランス（パリ）",
    zh: "法国（巴黎）",
  },
  "Europe/Berlin": {
    ko: "독일 (베를린)",
    en: "Germany (Berlin)",
    ja: "ドイツ（ベルリン）",
    zh: "德国（柏林）",
  },
  "Australia/Sydney": {
    ko: "호주 (시드니)",
    en: "Australia (Sydney)",
    ja: "オーストラリア（シドニー）",
    zh: "澳大利亚（悉尼）",
  },
  UTC: {
    ko: "UTC (협정 세계시)",
    en: "UTC (Coordinated Universal Time)",
    ja: "UTC（協定世界時）",
    zh: "UTC（协调世界时）",
  },
};

export function isSupportedTimezone(value: unknown): value is InviteTimezone {
  return typeof value === "string" && TIMEZONE_ID_SET.has(value);
}

export function sanitizeTimezone(
  value: unknown,
  language: InviteLanguage
): InviteTimezone {
  return isSupportedTimezone(value) ? value : DEFAULT_TIMEZONE[language];
}

export function timezoneLabel(
  id: string,
  language: InviteLanguage
): string {
  if (isSupportedTimezone(id)) {
    return TIMEZONE_LABELS[id][language];
  }
  return TIMEZONE_LABELS[DEFAULT_TIMEZONE[language]][language];
}
