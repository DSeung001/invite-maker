"use client";

import { useState } from "react";
import type { InviteLanguage } from "@/lib/invite-types";
import { RESULT_SHARE_UI } from "@/lib/invite-i18n";

type Props = {
  language: InviteLanguage;
  date: string;
  time: string;
  timezone: string;
  food: string;
};

export default function ResultShare({ language, date, time, timezone, food }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [fallbackText, setFallbackText] = useState<string | null>(null);
  const ui = RESULT_SHARE_UI[language];

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
