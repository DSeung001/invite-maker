import type { InviteLanguage } from "./invite-types";

export const SUPPORTED_LANGUAGES: readonly InviteLanguage[] = [
  "ko",
  "en",
  "ja",
  "zh",
] as const;

export function isSupportedLanguage(value: unknown): value is InviteLanguage {
  return (
    typeof value === "string" &&
    SUPPORTED_LANGUAGES.includes(value as InviteLanguage)
  );
}

export const LANGUAGE_LABELS: Record<InviteLanguage, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
};

export const DATE_LOCALES: Record<InviteLanguage, string> = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP",
  zh: "zh-CN",
};

export const TIMEZONE_LABELS: Record<InviteLanguage, string> = {
  ko: "한국 표준시",
  en: "KST (UTC+9)",
  ja: "韓国標準時",
  zh: "韩国标准时间",
};

export const RESULT_SHARE_UI: Record<
  InviteLanguage,
  {
    copy: string;
    share: string;
    copied: string;
    failed: string;
    header: string;
    date: string;
    time: string;
    tz: string;
    food: string;
  }
> = {
  ko: {
    copy: "결과 복사",
    share: "결과 공유",
    copied: "복사했어요!",
    failed: "복사에 실패했어요. 아래 내용을 직접 복사해 주세요.",
    header: "데이트 약속 완료",
    date: "날짜",
    time: "시간",
    tz: "시간대",
    food: "음식",
  },
  en: {
    copy: "Copy result",
    share: "Share result",
    copied: "Copied!",
    failed: "Copy failed. Please copy the text below.",
    header: "Date confirmed",
    date: "Date",
    time: "Time",
    tz: "Timezone",
    food: "Food",
  },
  ja: {
    copy: "結果をコピー",
    share: "結果を共有",
    copied: "コピーしました",
    failed: "コピーに失敗しました。下のテキストをコピーしてください。",
    header: "デートの約束完了",
    date: "日付",
    time: "時間",
    tz: "タイムゾーン",
    food: "食べ物",
  },
  zh: {
    copy: "复制结果",
    share: "分享结果",
    copied: "已复制",
    failed: "复制失败，请复制下面的文本。",
    header: "约会已确认",
    date: "日期",
    time: "时间",
    tz: "时区",
    food: "食物",
  },
};
