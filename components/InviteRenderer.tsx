"use client";

import { useRef, useState } from "react";
import EscapeButton from "./EscapeButton";
import ResultShare from "./ResultShare";
import type { InviteData } from "@/lib/invite-types";
import { sampleImageSrc } from "@/lib/paths";

type Step = "question" | "accepted" | "schedule" | "food" | "final" | "rejected";

const LOCALES = { ko: "ko-KR", en: "en-US", ja: "ja-JP" } as const;
const TZ_LABEL = { ko: "한국 표준시", en: "KST (UTC+9)", ja: "韓国標準時" } as const;

export function formatDate(date: string, language: InviteData["language"]): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(LOCALES[language], {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

export function formatTime(time: string, language: InviteData["language"]): string {
  const [h, min] = time.split(":").map(Number);
  return new Date(2000, 0, 1, h, min).toLocaleTimeString(LOCALES[language], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function InviteRenderer({ data }: { data: InviteData }) {
  const [step, setStep] = useState<Step>("question");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<number | null>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const { text, language } = data;
  const imageSrc =
    data.image.type === "sample" ? sampleImageSrc(data.image.value) : data.image.value;

  const fallbackImage = sampleImageSrc("sample-01");
  const [imgSrc, setImgSrc] = useState(imageSrc);

  const currentSchedule = data.schedules.find((s) => s.date === selectedDate);

  return (
    <div className="invite-card">
      {step === "question" && (
        <>
          <img
            className="invite-image"
            src={imgSrc}
            alt=""
            onError={() => imgSrc !== fallbackImage && setImgSrc(fallbackImage)}
          />
          <h1 className="invite-title">{text.question}</h1>
          <div className="invite-actions" ref={actionsRef}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStep("accepted")}
            >
              {text.yesLabel}
            </button>
            <EscapeButton
              label={text.noLabel}
              boundsRef={actionsRef}
              onReject={() => setStep("rejected")}
            />
          </div>
        </>
      )}

      {step === "accepted" && (
        <>
          <h1 className="invite-title">{text.yesTitle}</h1>
          <p className="invite-subtitle">{text.yesDescription}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setStep("schedule")}
          >
            {text.nextButton}
          </button>
        </>
      )}

      {step === "schedule" && (
        <>
          <h1 className="invite-title">{text.scheduleTitle}</h1>
          <div className="option-list" role="group" aria-label="date">
            {data.schedules.map((s) => (
              <button
                key={s.date}
                type="button"
                className={`option-chip${selectedDate === s.date ? " selected" : ""}`}
                aria-pressed={selectedDate === s.date}
                onClick={() => {
                  setSelectedDate(s.date);
                  setSelectedTime(null);
                }}
              >
                {selectedDate === s.date ? "✓ " : ""}
                {formatDate(s.date, language)}
              </button>
            ))}
          </div>
          {currentSchedule && (
            <div className="option-list time-list" role="group" aria-label="time">
              {currentSchedule.times.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`option-chip small${selectedTime === t ? " selected" : ""}`}
                  aria-pressed={selectedTime === t}
                  onClick={() => setSelectedTime(t)}
                >
                  {selectedTime === t ? "✓ " : ""}
                  {formatTime(t, language)}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            className="btn btn-primary"
            disabled={!selectedDate || !selectedTime}
            onClick={() => setStep("food")}
          >
            {text.nextButton}
          </button>
        </>
      )}

      {step === "food" && (
        <>
          <h1 className="invite-title">{text.foodTitle}</h1>
          <div className="food-grid" role="group" aria-label="food">
            {data.foods.map((f, i) => (
              <button
                key={`${f.label}-${i}`}
                type="button"
                className={`food-card${selectedFood === i ? " selected" : ""}`}
                aria-pressed={selectedFood === i}
                onClick={() => setSelectedFood(i)}
              >
                <span className="food-icon" aria-hidden>
                  {f.icon}
                </span>
                <span className="food-label">
                  {selectedFood === i ? "✓ " : ""}
                  {f.label}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={selectedFood === null}
            onClick={() => setStep("final")}
          >
            {text.nextButton}
          </button>
        </>
      )}

      {step === "final" && selectedDate && selectedTime && selectedFood !== null && (
        <>
          <h1 className="invite-title">{text.finalTitle}</h1>
          {text.finalLetter && <p className="invite-letter">{text.finalLetter}</p>}
          <dl className="result-summary">
            <div>
              <dt>📅</dt>
              <dd>{formatDate(selectedDate, language)}</dd>
            </div>
            <div>
              <dt>🕐</dt>
              <dd>
                {formatTime(selectedTime, language)} · {TZ_LABEL[language]}
              </dd>
            </div>
            <div>
              <dt>{data.foods[selectedFood].icon}</dt>
              <dd>{data.foods[selectedFood].label}</dd>
            </div>
          </dl>
          <ResultShare
            language={language}
            date={formatDate(selectedDate, language)}
            time={formatTime(selectedTime, language)}
            timezone={TZ_LABEL[language]}
            food={data.foods[selectedFood].label}
          />
        </>
      )}

      {step === "rejected" && (
        <>
          <h1 className="invite-title">{text.rejectTitle}</h1>
          <p className="invite-subtitle">{text.rejectDescription}</p>
        </>
      )}
    </div>
  );
}
