"use client";

import { useMemo, useState } from "react";
import InviteRenderer from "@/components/InviteRenderer";
import { encodeInvite } from "@/lib/invite-codec";
import { createDefaultInvite, TEXT_PRESETS } from "@/lib/invite-defaults";
import { isValidImageUrl, normalizeSchedules } from "@/lib/invite-validation";
import {
  InviteData,
  InviteLanguage,
  LIMITS,
  SAMPLE_IMAGE_IDS,
} from "@/lib/invite-types";
import { sampleImageSrc } from "@/lib/paths";

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function EditorPage() {
  const [invite, setInvite] = useState<InviteData>(() => createDefaultInvite("ko"));
  const [urlInput, setUrlInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const update = (patch: Partial<InviteData>) => {
    setInvite((prev) => ({ ...prev, ...patch }));
    setPreviewKey((k) => k + 1);
    setCopied(false);
  };

  const updateText = (field: keyof InviteData["text"], value: string) => {
    setInvite((prev) => ({ ...prev, text: { ...prev.text, [field]: value } }));
    setPreviewKey((k) => k + 1);
    setCopied(false);
  };

  const setLanguage = (language: InviteLanguage) => {
    update({ language, text: { ...TEXT_PRESETS[language] } });
  };

  // --- schedules ---
  const addDate = () => {
    if (invite.schedules.length >= LIMITS.maxDates) return;
    update({ schedules: [...invite.schedules, { date: "", times: [] }] });
  };

  const setDate = (index: number, date: string) => {
    update({
      schedules: invite.schedules.map((s, i) => (i === index ? { ...s, date } : s)),
    });
  };

  const removeDate = (index: number) => {
    update({ schedules: invite.schedules.filter((_, i) => i !== index) });
  };

  const toggleTime = (index: number, time: string) => {
    const schedules = invite.schedules.map((s, i) => {
      if (i !== index) return s;
      const has = s.times.includes(time);
      if (!has && s.times.length >= LIMITS.maxTimesPerDate) return s;
      return {
        ...s,
        times: has ? s.times.filter((t) => t !== time) : [...s.times, time].sort(),
      };
    });
    update({ schedules });
  };

  // --- foods ---
  const setFood = (index: number, field: "icon" | "label", value: string) => {
    update({
      foods: invite.foods.map((f, i) => (i === index ? { ...f, [field]: value } : f)),
    });
  };

  const addFood = () => {
    if (invite.foods.length >= LIMITS.maxFoods) return;
    update({ foods: [...invite.foods, { icon: "🍽️", label: "" }] });
  };

  const removeFood = (index: number) => {
    if (invite.foods.length <= LIMITS.minFoods) return;
    update({ foods: invite.foods.filter((_, i) => i !== index) });
  };

  // --- validation & link ---
  const today = todayString();
  const cleanedInvite: InviteData = useMemo(() => {
    return {
      ...invite,
      schedules: normalizeSchedules(invite.schedules.filter((s) => s.date >= today)),
      foods: invite.foods.filter((f) => f.label.trim().length > 0),
    };
  }, [invite, today]);

  const errors: string[] = [];
  if (cleanedInvite.schedules.length === 0)
    errors.push("과거가 아닌 날짜와 시간을 최소 1개 설정해 주세요.");
  if (cleanedInvite.foods.length < LIMITS.minFoods)
    errors.push(`음식 후보를 ${LIMITS.minFoods}개 이상 입력해 주세요.`);
  if (invite.image.type === "url" && !isValidImageUrl(invite.image.value))
    errors.push("이미지 URL은 https:// 로 시작해야 하며 500자 이하여야 합니다.");
  if (!invite.text.question.trim()) errors.push("메인 질문을 입력해 주세요.");

  const hasErrors = errors.length > 0;
  const inviteUrl = useMemo(() => {
    if (hasErrors || typeof window === "undefined") return null;
    const base = `${window.location.origin}${window.location.pathname.replace(/\/$/, "")}`;
    return `${base}/invite/#d=${encodeInvite(cleanedInvite)}`;
  }, [cleanedInvite, hasErrors]);

  const urlTooLong = inviteUrl !== null && inviteUrl.length > LIMITS.urlBlock;
  const urlWarning =
    inviteUrl !== null && !urlTooLong && inviteUrl.length > LIMITS.urlWarn;

  const copyLink = async () => {
    if (!inviteUrl || urlTooLong) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
    } catch {
      // link textarea is rendered below as a manual fallback
    }
  };

  const previewData =
    cleanedInvite.schedules.length > 0 &&
    cleanedInvite.foods.length >= LIMITS.minFoods
      ? cleanedInvite
      : invite;

  return (
    <main className="editor-layout">
      <div className="editor-form">
        <h1 className="editor-heading">데이트 초대장 만들기 💌</h1>

        <section className="editor-section">
          <h2>언어</h2>
          <div className="chip-row">
            {(["ko", "en", "ja"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                className={`option-chip small${invite.language === lang ? " selected" : ""}`}
                aria-pressed={invite.language === lang}
                onClick={() => setLanguage(lang)}
              >
                {lang === "ko" ? "한국어" : lang === "en" ? "English" : "日本語"}
              </button>
            ))}
          </div>
          <p className="hint">언어를 바꾸면 기본 문구가 초기화됩니다.</p>
        </section>

        <section className="editor-section">
          <h2>대표 이미지</h2>
          <div className="sample-grid">
            {SAMPLE_IMAGE_IDS.map((id) => (
              <button
                key={id}
                type="button"
                className={`sample-thumb${
                  invite.image.type === "sample" && invite.image.value === id
                    ? " selected"
                    : ""
                }`}
                aria-pressed={invite.image.type === "sample" && invite.image.value === id}
                onClick={() => {
                  setUrlInput("");
                  update({ image: { type: "sample", value: id } });
                }}
              >
                <img src={sampleImageSrc(id)} alt={`샘플 이미지 ${id}`} />
              </button>
            ))}
          </div>
          <label className="field">
            <span>또는 외부 이미지 URL (https만 허용)</span>
            <input
              type="url"
              value={urlInput}
              maxLength={LIMITS.imageUrl}
              placeholder="https://example.com/image.webp"
              onChange={(e) => {
                const value = e.target.value;
                setUrlInput(value);
                if (value.trim() === "") {
                  update({ image: { type: "sample", value: "sample-01" } });
                } else {
                  update({ image: { type: "url", value: value.trim() } });
                }
              }}
            />
          </label>
        </section>

        <section className="editor-section">
          <h2>문구</h2>
          <label className="field">
            <span>
              메인 질문 ({invite.text.question.length}/{LIMITS.question})
            </span>
            <input
              value={invite.text.question}
              maxLength={LIMITS.question}
              onChange={(e) => updateText("question", e.target.value)}
            />
          </label>
          <label className="field">
            <span>
              수락 확인 제목 ({invite.text.yesTitle.length}/{LIMITS.yesTitle})
            </span>
            <input
              value={invite.text.yesTitle}
              maxLength={LIMITS.yesTitle}
              onChange={(e) => updateText("yesTitle", e.target.value)}
            />
          </label>
          <label className="field">
            <span>
              수락 확인 부제 ({invite.text.yesDescription.length}/{LIMITS.yesDescription})
            </span>
            <input
              value={invite.text.yesDescription}
              maxLength={LIMITS.yesDescription}
              onChange={(e) => updateText("yesDescription", e.target.value)}
            />
          </label>
          <label className="field">
            <span>
              거절 제목 ({invite.text.rejectTitle.length}/{LIMITS.rejectTitle})
            </span>
            <input
              value={invite.text.rejectTitle}
              maxLength={LIMITS.rejectTitle}
              onChange={(e) => updateText("rejectTitle", e.target.value)}
            />
          </label>
          <label className="field">
            <span>
              거절 설명 ({invite.text.rejectDescription.length}/{LIMITS.rejectDescription})
            </span>
            <input
              value={invite.text.rejectDescription}
              maxLength={LIMITS.rejectDescription}
              onChange={(e) => updateText("rejectDescription", e.target.value)}
            />
          </label>
          <label className="field">
            <span>
              마지막 편지 ({invite.text.finalLetter.length}/{LIMITS.finalLetter})
            </span>
            <textarea
              value={invite.text.finalLetter}
              maxLength={LIMITS.finalLetter}
              rows={4}
              onChange={(e) => updateText("finalLetter", e.target.value)}
            />
          </label>
        </section>

        <section className="editor-section">
          <h2>가능한 날짜와 시간 (최대 {LIMITS.maxDates}일)</h2>
          {invite.schedules.map((s, i) => (
            <div key={i} className="schedule-editor">
              <div className="schedule-editor-head">
                <input
                  type="date"
                  value={s.date}
                  min={today}
                  onChange={(e) => setDate(i, e.target.value)}
                  aria-label={`날짜 ${i + 1}`}
                />
                <button
                  type="button"
                  className="btn-remove"
                  aria-label="날짜 삭제"
                  onClick={() => removeDate(i)}
                >
                  ✕
                </button>
              </div>
              <div className="time-grid">
                {TIME_OPTIONS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`time-chip${s.times.includes(t) ? " selected" : ""}`}
                    aria-pressed={s.times.includes(t)}
                    onClick={() => toggleTime(i, t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="hint">
                선택한 시간 {s.times.length}/{LIMITS.maxTimesPerDate}
              </p>
            </div>
          ))}
          {invite.schedules.length < LIMITS.maxDates && (
            <button type="button" className="btn btn-secondary" onClick={addDate}>
              + 날짜 추가
            </button>
          )}
        </section>

        <section className="editor-section">
          <h2>
            음식 후보 ({LIMITS.minFoods}~{LIMITS.maxFoods}개)
          </h2>
          {invite.foods.map((f, i) => (
            <div key={i} className="food-editor-row">
              <input
                className="food-icon-input"
                value={f.icon}
                maxLength={4}
                aria-label={`음식 ${i + 1} 이모지`}
                onChange={(e) => setFood(i, "icon", e.target.value)}
              />
              <input
                value={f.label}
                maxLength={LIMITS.foodLabel}
                placeholder="메뉴 이름"
                aria-label={`음식 ${i + 1} 이름`}
                onChange={(e) => setFood(i, "label", e.target.value)}
              />
              <button
                type="button"
                className="btn-remove"
                aria-label="음식 삭제"
                disabled={invite.foods.length <= LIMITS.minFoods}
                onClick={() => removeFood(i)}
              >
                ✕
              </button>
            </div>
          ))}
          {invite.foods.length < LIMITS.maxFoods && (
            <button type="button" className="btn btn-secondary" onClick={addFood}>
              + 음식 추가
            </button>
          )}
        </section>

        <section className="editor-section">
          <h2>공유 링크</h2>
          {hasErrors && (
            <ul className="error-list" role="alert">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
          {urlTooLong && (
            <p className="error-list" role="alert">
              링크가 너무 깁니다. 긴 문구나 이미지 URL을 줄여 주세요.
            </p>
          )}
          {urlWarning && (
            <p className="hint">링크가 깁니다. 일부 앱에서 잘릴 수 있어요.</p>
          )}
          <div className="link-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!inviteUrl || urlTooLong}
              onClick={copyLink}
            >
              {copied ? "복사 완료! 💗" : "초대장 링크 복사"}
            </button>
            <button
              type="button"
              className="btn btn-secondary preview-toggle"
              onClick={() => {
                setShowPreview((v) => !v);
                setPreviewKey((k) => k + 1);
              }}
            >
              {showPreview ? "미리보기 닫기" : "미리보기"}
            </button>
          </div>
          {inviteUrl && !urlTooLong && (
            <textarea
              className="share-fallback"
              readOnly
              value={inviteUrl}
              rows={3}
              onFocus={(e) => e.currentTarget.select()}
              aria-label="초대장 링크"
            />
          )}
          <p className="hint">
            이 링크에는 초대장 내용이 그대로 담겨 있어요. 이름, 전화번호 같은
            민감한 정보는 넣지 마세요.
          </p>
        </section>
      </div>

      <aside className={`editor-preview${showPreview ? " open" : ""}`}>
        <div className="preview-frame theme">
          <InviteRenderer key={previewKey} data={previewData} />
        </div>
      </aside>
    </main>
  );
}
