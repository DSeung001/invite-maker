"use client";

import { useEffect, useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import {
  isSupportedLanguage,
  LANDING_UI,
  LANGUAGE_LABELS,
  SUPPORTED_LANGUAGES,
} from "@/lib/invite-i18n";
import { SITE_CHROME } from "@/lib/site-pages-i18n";
import type { InviteLanguage } from "@/lib/invite-types";
import { assetPath, createPath } from "@/lib/paths";

const LANDING_LANG_KEY = "date-invite-landing-lang";

export default function LandingPage() {
  const [language, setLanguage] = useState<InviteLanguage>("ko");
  const ui = LANDING_UI[language];
  const chrome = SITE_CHROME[language];
  const createHref = createPath();

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LANDING_LANG_KEY);
      if (isSupportedLanguage(stored)) setLanguage(stored);
    } catch {
      // ignore storage access errors
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(LANDING_LANG_KEY, language);
    } catch {
      // ignore storage access errors
    }
  }, [language]);

  return (
    <div className="landing">
      <header className="landing-nav">
        <div className="landing-lang">
          <span className="landing-lang-label">{chrome.language}</span>
          <ul className="landing-lang-list">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <li key={lang}>
                <button
                  type="button"
                  className="landing-lang-btn"
                  aria-pressed={lang === language}
                  aria-current={lang === language ? "true" : undefined}
                  onClick={() => setLanguage(lang)}
                >
                  {LANGUAGE_LABELS[lang]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="landing-intro" aria-labelledby="landing-brand">
        <p id="landing-brand" className="landing-brand">
          {ui.brand}
        </p>
        <h1 className="landing-headline">{ui.headline}</h1>
        <p className="landing-support">{ui.support}</p>
      </section>

      <section className="landing-howto" aria-labelledby="landing-howto-title">
        <div className="landing-howto-inner">
          <h2 id="landing-howto-title" className="landing-section-title">
            {ui.howToTitle}
          </h2>
          <p className="landing-section-support">{ui.howToSupport}</p>
          <ol className="landing-steps">
            {ui.steps.map((step, index) => (
              <li
                key={step.image}
                className={`landing-step${
                  step.image === "make" ? " landing-step-wide" : ""
                }`}
              >
                <div className="landing-step-header">
                  <span className="landing-step-num" aria-hidden>
                    {index + 1}
                  </span>
                  <h3 className="landing-step-title">{step.title}</h3>
                </div>
                <p className="landing-step-text">{step.description}</p>
                <div
                  className={
                    step.image === "make"
                      ? "landing-step-preview landing-step-preview-uncropped"
                      : step.image === "share"
                        ? "landing-step-preview landing-step-preview-contain"
                        : "landing-step-preview"
                  }
                >
                  <img
                    src={assetPath(`/images/landing/${step.image}.png`)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="landing-cta-block" aria-labelledby="landing-cta-title">
        <h2 id="landing-cta-title" className="landing-section-title">
          {ui.ctaTitle}
        </h2>
        <p className="landing-section-support">{ui.ctaSupport}</p>
        <a className="landing-cta" href={createHref}>
          {ui.ctaLabel}
        </a>
      </section>

      <SiteFooter language={language} />
    </div>
  );
}
