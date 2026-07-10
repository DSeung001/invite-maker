"use client";

import { useState } from "react";
import type { InviteLanguage } from "@/lib/invite-types";

type Props = {
  language: InviteLanguage;
  date: string;
  time: string;
  timezone: string;
  food: string;
};

const UI = {
  ko: {
    copy: "결과 복사",
    share: "결과 공유",
    copied: "복사했어요!",
    failed: "복사에 실패했어요. 아래 내용을 직접 복사해 주세요.",
    header: "데이트 약속 완료 💗",
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
    header: "Date confirmed 💗",
    date: "Date",
    time: "Time",
    tz: "Timezone",
    food: "Food",
  },
  ja: {
    copy: "結果をコピー",
    share: "結果を共有",
    copied: "コピーしました！",
    failed: "コピーに失敗しました。下のテキストをコピーしてください。",
    header: "デートの約束完了 💗",
    date: "日付",
    time: "時間",
    tz: "タイムゾーン",
    food: "食べ物",
  },
} as const;

export default function ResultShare({ language, date, time, timezone, food }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [fallbackText, setFallbackText] = useState<string | null>(null);
  const ui = UI[language];

  const resultText = [
    ui.header,
    "",
    `${ui.date}: ${date}`,
    `${ui.time}: ${time}`,
    `${ui.tz}: ${timezone}`,
    `${ui.food}: ${food}`,
  ].join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setMessage(ui.copied);
      setFallbackText(null);
    } catch {
      setMessage(ui.failed);
      setFallbackText(resultText);
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: resultText });
      } catch {
        // user cancelled — ignore
      }
    } else {
      await copy();
    }
  };

  return (
    <div className="result-share">
      <button type="button" className="btn btn-primary" onClick={copy}>
        {ui.copy}
      </button>
      <button type="button" className="btn btn-secondary" onClick={share}>
        {ui.share}
      </button>
      {message && (
        <p className="share-message" role="status">
          {message}
        </p>
      )}
      {fallbackText && (
        <textarea
          className="share-fallback"
          readOnly
          value={fallbackText}
          rows={6}
          onFocus={(e) => e.currentTarget.select()}
        />
      )}
    </div>
  );
}
