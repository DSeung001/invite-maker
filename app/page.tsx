"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DeveloperFeedback from "@/components/DeveloperFeedback";
import InviteRenderer from "@/components/InviteRenderer";
import ScheduleEditorRow from "@/components/ScheduleEditorRow";
import { encodeInvite } from "@/lib/invite-codec";
import {
  createDefaultFoods,
  createDefaultInvite,
  FOOD_PRESETS,
  TEXT_PRESETS,
} from "@/lib/invite-defaults";
import {
  EDITOR_UI,
  LANGUAGE_LABELS,
  SUPPORTED_LANGUAGES,
  TIME_PRESET_LABELS,
} from "@/lib/invite-i18n";
import { isValidImageUrl, normalizeSchedules } from "@/lib/invite-validation";
import {
  FoodOption,
  InviteData,
  InviteLanguage,
  LIMITS,
  SAMPLE_IMAGE_IDS,
} from "@/lib/invite-types";
import { assetPath, sampleImageSrc } from "@/lib/paths";

const SAMPLE_PAGE_SIZE = 6;
const SAMPLES_ON_FIRST_PAGE = SAMPLE_PAGE_SIZE - 1;

function getTotalSamplePages(): number {
  const remaining = Math.max(0, SAMPLE_IMAGE_IDS.length - SAMPLES_ON_FIRST_PAGE);
  return 1 + Math.ceil(remaining / SAMPLE_PAGE_SIZE);
}

function getSamplePageForIndex(index: number): number {
  if (index < SAMPLES_ON_FIRST_PAGE) return 1;
  return 2 + Math.floor((index - SAMPLES_ON_FIRST_PAGE) / SAMPLE_PAGE_SIZE);
}

function getPagedSampleIds(page: number): string[] {
  if (page === 1) {
    return SAMPLE_IMAGE_IDS.slice(0, SAMPLES_ON_FIRST_PAGE);
  }
  const start = SAMPLES_ON_FIRST_PAGE + (page - 2) * SAMPLE_PAGE_SIZE;
  return SAMPLE_IMAGE_IDS.slice(start, start + SAMPLE_PAGE_SIZE);
}

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function areFoodListsEqual(left: FoodOption[], right: FoodOption[]): boolean {
  return (
    left.length === right.length &&
    left.every(
      (food, index) =>
        food.icon === right[index]?.icon && food.label === right[index]?.label
    )
  );
}

export default function EditorPage() {
  const [invite, setInvite] = useState<InviteData>(() => createDefaultInvite("ko"));
  const [urlDraft, setUrlDraft] = useState("");
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [samplePage, setSamplePage] = useState(1);
  const [activeFoodIndex, setActiveFoodIndex] = useState(0);
  const urlInputRef = useRef<HTMLInputElement>(null);

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
    const nextDefaultFoods = createDefaultFoods(language);
    const shouldRefreshFoods = areFoodListsEqual(
      invite.foods,
      createDefaultFoods(invite.language)
    );

    update({
      language,
      text: { ...TEXT_PRESETS[language] },
      ...(shouldRefreshFoods ? { foods: nextDefaultFoods } : {}),
    });
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

  const addTime = (index: number, time: string) => {
    const schedules = invite.schedules.map((s, i) => {
      if (i !== index) return s;
      if (s.times.includes(time) || s.times.length >= LIMITS.maxTimesPerDate) return s;
      return { ...s, times: [...s.times, time].sort() };
    });
    update({ schedules });
  };

  const removeTime = (index: number, time: string) => {
    update({
      schedules: invite.schedules.map((s, i) =>
        i === index ? { ...s, times: s.times.filter((t) => t !== time) } : s
      ),
    });
  };

  const applyPreset = (index: number, presetTimes: string[]) => {
    update({
      schedules: invite.schedules.map((s, i) =>
        i === index
          ? { ...s, times: presetTimes.slice(0, LIMITS.maxTimesPerDate) }
          : s
      ),
    });
  };

  const clearTimes = (index: number) => {
    update({
      schedules: invite.schedules.map((s, i) => (i === index ? { ...s, times: [] } : s)),
    });
  };

  const copyTimesToOtherDates = (sourceIndex: number) => {
    const source = invite.schedules[sourceIndex];
    if (!source || source.times.length === 0 || invite.schedules.length < 2) return;
    const times = [...source.times].slice(0, LIMITS.maxTimesPerDate);
    update({
      schedules: invite.schedules.map((s, i) =>
        i === sourceIndex ? s : { ...s, times: [...times] }
      ),
    });
  };

  // --- foods ---
  const setFood = (index: number, field: "icon" | "label", value: string) => {
    setActiveFoodIndex(index);
    update({
      foods: invite.foods.map((f, i) => (i === index ? { ...f, [field]: value } : f)),
    });
  };

  const applyFoodPreset = (preset: FoodOption) => {
    update({
      foods: invite.foods.map((food, index) =>
        index === activeFoodIndex ? { ...preset } : food
      ),
    });
  };

  const addFood = () => {
    if (invite.foods.length >= LIMITS.maxFoods) return;
    setActiveFoodIndex(invite.foods.length);
    update({ foods: [...invite.foods, { icon: "🍽️", label: "" }] });
  };

  const removeFood = (index: number) => {
    if (invite.foods.length <= LIMITS.minFoods) return;
    const nextFoods = invite.foods.filter((_, i) => i !== index);
    setActiveFoodIndex((current) => {
      if (current > index) return current - 1;
      return Math.min(current, nextFoods.length - 1);
    });
    update({ foods: nextFoods });
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

  const ui = EDITOR_UI[invite.language];
  const timePresetLabels = TIME_PRESET_LABELS[invite.language];

  const errors = useMemo(() => {
    const msgs: string[] = [];
    if (cleanedInvite.schedules.length === 0) msgs.push(ui.errorNoSchedule);
    if (cleanedInvite.foods.length < LIMITS.minFoods)
      msgs.push(ui.errorMinFoods(LIMITS.minFoods));
    if (invite.image.type === "url" && !isValidImageUrl(invite.image.value))
      msgs.push(ui.errorInvalidImageUrl);
    if (!invite.text.question.trim()) msgs.push(ui.errorNoQuestion);
    return msgs;
  }, [cleanedInvite, invite.image, invite.text.question, invite.language]);

  const hasErrors = errors.length > 0;
  const inviteUrl = useMemo(() => {
    if (hasErrors) return null;
    return `${assetPath("/invite/")}?d=${encodeInvite(cleanedInvite)}`;
  }, [cleanedInvite, hasErrors]);

  const urlTooLong = inviteUrl !== null && inviteUrl.length > LIMITS.urlBlock;
  const urlWarning =
    inviteUrl !== null && !urlTooLong && inviteUrl.length > LIMITS.urlWarn;

  const copyLink = async () => {
    if (!inviteUrl || urlTooLong) return;
    const fullUrl = `${window.location.origin}${inviteUrl}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
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
  const totalSamplePages = getTotalSamplePages();
  const pagedSampleIds = useMemo(() => getPagedSampleIds(samplePage), [samplePage]);

  useEffect(() => {
    if (invite.image.type === "url") {
      setSamplePage(1);
      return;
    }
    const selectedIndex = SAMPLE_IMAGE_IDS.findIndex((id) => id === invite.image.value);
    if (selectedIndex === -1) return;
    setSamplePage(getSamplePageForIndex(selectedIndex));
  }, [invite.image.type, invite.image.value]);

  useEffect(() => {
    if (!showUrlModal) return;
    requestAnimationFrame(() => urlInputRef.current?.focus());
  }, [showUrlModal]);

  useEffect(() => {
    if (!showUrlModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowUrlModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showUrlModal]);

  useEffect(() => {
    document.documentElement.lang = invite.language;
  }, [invite.language]);

  const openUrlModal = () => {
    setUrlDraft(invite.image.type === "url" ? invite.image.value : "");
    setShowUrlModal(true);
  };

  const applyUrlDraft = () => {
    const value = urlDraft.trim();
    if (!isValidImageUrl(value)) return;
    update({ image: { type: "url", value } });
    setShowUrlModal(false);
  };
  const activeFood = invite.foods[activeFoodIndex];
  const presetFoods = FOOD_PRESETS[invite.language];
  const urlDraftValid = isValidImageUrl(urlDraft.trim());

  return (
    <main className="editor-layout">
      <div className="editor-form">
        <h1 className="editor-heading">{ui.heading}</h1>

        <section className="editor-section">
          <h2>{ui.sectionLanguage}</h2>
          <div className="chip-row">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                className={`option-chip small${invite.language === lang ? " selected" : ""}`}
                aria-pressed={invite.language === lang}
                onClick={() => setLanguage(lang)}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            ))}
          </div>
          <p className="hint">{ui.languageHint}</p>
        </section>

        <section className="editor-section">
          <h2>{ui.sectionImage}</h2>
          <div className="sample-grid">
            {samplePage === 1 && (
              <button
                type="button"
                className={`sample-thumb sample-thumb-custom${
                  invite.image.type === "url" ? " selected" : ""
                }`}
                aria-pressed={invite.image.type === "url"}
                aria-label={ui.customImageAriaLabel}
                onClick={openUrlModal}
              >
                <span className="sample-thumb-custom-icon" aria-hidden>
                  ?
                </span>
                <span className="sample-thumb-custom-label">{ui.customImageLabel}</span>
              </button>
            )}
            {pagedSampleIds.map((id) => (
              <button
                key={id}
                type="button"
                className={`sample-thumb${
                  invite.image.type === "sample" && invite.image.value === id
                    ? " selected"
                    : ""
                }`}
                aria-pressed={invite.image.type === "sample" && invite.image.value === id}
                onClick={() => update({ image: { type: "sample", value: id } })}
              >
                <img src={sampleImageSrc(id)} alt={ui.sampleImageAlt(id)} />
              </button>
            ))}
          </div>
          <div className="sample-pagination" aria-label={ui.samplePaginationAriaLabel}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSamplePage((p) => Math.max(1, p - 1))}
              disabled={samplePage === 1}
            >
              {ui.prev}
            </button>
            <span className="sample-page-indicator">
              {samplePage} / {totalSamplePages}
            </span>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSamplePage((p) => Math.min(totalSamplePages, p + 1))}
              disabled={samplePage === totalSamplePages}
            >
              {ui.next}
            </button>
          </div>
        </section>

        <section className="editor-section">
          <h2 className="section-heading-with-help">
            {ui.sectionText}
            <span
              className="help-tip"
              tabIndex={0}
              aria-label={ui.lineBreakHelpAriaLabel}
            >
              ?
              <span className="help-tip-popup" role="tooltip">
                {ui.lineBreakHelp}
              </span>
            </span>
          </h2>
          <label className="field">
            <span>
              {ui.fieldQuestion} ({ui.fieldCount(invite.text.question.length, LIMITS.question)})
            </span>
            <input
              value={invite.text.question}
              maxLength={LIMITS.question}
              onChange={(e) => updateText("question", e.target.value)}
            />
          </label>
          <label className="field">
            <span>
              {ui.fieldYesTitle} ({ui.fieldCount(invite.text.yesTitle.length, LIMITS.yesTitle)})
            </span>
            <input
              value={invite.text.yesTitle}
              maxLength={LIMITS.yesTitle}
              onChange={(e) => updateText("yesTitle", e.target.value)}
            />
          </label>
          <label className="field">
            <span>
              {ui.fieldYesDescription} (
              {ui.fieldCount(invite.text.yesDescription.length, LIMITS.yesDescription)})
            </span>
            <input
              value={invite.text.yesDescription}
              maxLength={LIMITS.yesDescription}
              onChange={(e) => updateText("yesDescription", e.target.value)}
            />
          </label>
          <label className="field">
            <span>
              {ui.fieldRejectTitle} (
              {ui.fieldCount(invite.text.rejectTitle.length, LIMITS.rejectTitle)})
            </span>
            <input
              value={invite.text.rejectTitle}
              maxLength={LIMITS.rejectTitle}
              onChange={(e) => updateText("rejectTitle", e.target.value)}
            />
          </label>
          <label className="field">
            <span>
              {ui.fieldRejectDescription} (
              {ui.fieldCount(invite.text.rejectDescription.length, LIMITS.rejectDescription)})
            </span>
            <input
              value={invite.text.rejectDescription}
              maxLength={LIMITS.rejectDescription}
              onChange={(e) => updateText("rejectDescription", e.target.value)}
            />
          </label>
          <label className="field">
            <span>
              {ui.fieldFinalLetter} (
              {ui.fieldCount(invite.text.finalLetter.length, LIMITS.finalLetter)})
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
          <h2>{ui.sectionSchedule(LIMITS.maxDates)}</h2>
          {invite.schedules.map((s, i) => (
            <ScheduleEditorRow
              key={i}
              schedule={s}
              index={i}
              today={today}
              canCopy={invite.schedules.length >= 2}
              ui={ui}
              timePresetLabels={timePresetLabels}
              onDateChange={(date) => setDate(i, date)}
              onRemove={() => removeDate(i)}
              onApplyPreset={(times) => applyPreset(i, times)}
              onClearTimes={() => clearTimes(i)}
              onAddTime={(time) => addTime(i, time)}
              onRemoveTime={(time) => removeTime(i, time)}
              onCopyTimes={() => copyTimesToOtherDates(i)}
            />
          ))}
          {invite.schedules.length < LIMITS.maxDates && (
            <button type="button" className="btn btn-secondary" onClick={addDate}>
              {ui.addDate}
            </button>
          )}
        </section>

        <section className="editor-section">
          <h2>{ui.sectionFoods(LIMITS.minFoods, LIMITS.maxFoods)}</h2>
          <div
            className="food-grid food-editor-grid"
            role="group"
            aria-label={ui.sectionFoods(LIMITS.minFoods, LIMITS.maxFoods)}
          >
            {invite.foods.map((f, i) => (
              <div
                key={i}
                className={`food-card food-editor-card${i === activeFoodIndex ? " selected" : ""}`}
                onClick={() => setActiveFoodIndex(i)}
              >
                <button
                  type="button"
                  className="food-editor-remove"
                  aria-label={ui.removeFoodAriaLabel}
                  disabled={invite.foods.length <= LIMITS.minFoods}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFood(i);
                  }}
                >
                  ✕
                </button>
                <input
                  className="food-editor-icon"
                  value={f.icon}
                  maxLength={4}
                  aria-label={ui.foodEmojiAriaLabel(i + 1)}
                  onFocus={() => setActiveFoodIndex(i)}
                  onChange={(e) => setFood(i, "icon", e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <input
                  className="food-editor-label"
                  value={f.label}
                  maxLength={LIMITS.foodLabel}
                  placeholder={ui.foodNamePlaceholder}
                  aria-label={ui.foodNameAriaLabel(i + 1)}
                  onFocus={() => setActiveFoodIndex(i)}
                  onChange={(e) => setFood(i, "label", e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ))}
          </div>
          {invite.foods.length < LIMITS.maxFoods && (
            <button type="button" className="btn btn-secondary" onClick={addFood}>
              {ui.addFood}
            </button>
          )}
          <div className="food-preset-panel">
            <div className="food-preset-head">
              <div>
                <h3 className="food-preset-title">{ui.recommendedMenusTitle}</h3>
                <p className="hint">{ui.recommendedMenusHint}</p>
              </div>
              <span className="food-slot-badge">
                {ui.currentSlotBadge(activeFoodIndex + 1)}
              </span>
            </div>
            <div className="food-preset-grid">
              {presetFoods.map((preset) => {
                const isSelected =
                  activeFood?.icon === preset.icon && activeFood?.label === preset.label;

                return (
                  <button
                    key={`${preset.icon}-${preset.label}`}
                    type="button"
                    className={`food-preset-chip${isSelected ? " selected" : ""}`}
                    aria-pressed={isSelected}
                    onClick={() => applyFoodPreset(preset)}
                  >
                    <span className="food-preset-icon" aria-hidden>
                      {preset.icon}
                    </span>
                    <span className="food-preset-label">{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="editor-section">
          <h2>{ui.sectionShareLink}</h2>
          {hasErrors && (
            <ul className="error-list" role="alert">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
          {urlTooLong && (
            <p className="error-list" role="alert">
              {ui.errorUrlTooLong}
            </p>
          )}
          {urlWarning && <p className="hint">{ui.warningUrlLong}</p>}
          <div className="link-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!inviteUrl || urlTooLong}
              onClick={copyLink}
            >
              {copied ? ui.copied : ui.copyLink}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              disabled={!inviteUrl || urlTooLong}
              onClick={() => {
                if (!inviteUrl) return;
                window.open(inviteUrl, "_blank", "noopener,noreferrer");
              }}
            >
              {ui.openInvite}
            </button>
            <button
              type="button"
              className="btn btn-secondary preview-toggle"
              onClick={() => {
                setShowPreview((v) => !v);
                setPreviewKey((k) => k + 1);
              }}
            >
              {showPreview ? ui.previewClose : ui.previewOpen}
            </button>
          </div>
          <p className="hint">{ui.shareLinkHint}</p>
        </section>

        <DeveloperFeedback language={invite.language} />
      </div>

      <aside className={`editor-preview${showPreview ? " open" : ""}`}>
        <div className="preview-frame theme">
          <InviteRenderer key={previewKey} data={previewData} />
        </div>
      </aside>

      {showUrlModal && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={() => setShowUrlModal(false)}
        >
          <div
            className="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="url-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="url-modal-title" className="modal-title">
              {ui.urlModalTitle}
            </h3>
            <p className="modal-hint">{ui.urlModalHint}</p>
            <label className="field">
              <span>{ui.urlModalFieldLabel}</span>
              <input
                ref={urlInputRef}
                type="url"
                value={urlDraft}
                maxLength={LIMITS.imageUrl}
                placeholder="https://example.com/photo.jpg"
                onChange={(e) => setUrlDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && urlDraftValid) applyUrlDraft();
                }}
              />
            </label>
            {urlDraft.trim() && !urlDraftValid && (
              <p className="modal-error" role="alert">
                {ui.urlModalError}
              </p>
            )}
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowUrlModal(false)}
              >
                {ui.cancel}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!urlDraftValid}
                onClick={applyUrlDraft}
              >
                {ui.apply}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
