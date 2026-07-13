"use client";

import { usePathname } from "next/navigation";
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES } from "@/lib/invite-i18n";
import { SITE_CHROME } from "@/lib/site-pages-i18n";
import type { InviteLanguage } from "@/lib/invite-types";
import {
  homePath,
  sitePagePath,
  type SitePageSlug,
  SITE_PAGE_SLUGS,
} from "@/lib/paths";

type Props = {
  language: InviteLanguage;
};

function slugFromPathname(pathname: string): SitePageSlug {
  const parts = pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  if (last && (SITE_PAGE_SLUGS as readonly string[]).includes(last)) {
    return last as SitePageSlug;
  }
  return "about";
}

export default function SiteContentNav({ language }: Props) {
  const pathname = usePathname() ?? "";
  const slug = slugFromPathname(pathname);
  const chrome = SITE_CHROME[language];

  return (
    <header className="site-content-nav">
      <a className="site-content-brand" href={homePath()}>
        {chrome.siteName}
      </a>
      <a className="site-content-home" href={homePath()}>
        {chrome.backHome}
      </a>
      <div className="site-content-lang">
        <span className="site-content-lang-label">{chrome.language}</span>
        <ul className="site-content-lang-list">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang}>
              <a
                href={sitePagePath(lang, slug)}
                hrefLang={lang}
                aria-current={lang === language ? "page" : undefined}
              >
                {LANGUAGE_LABELS[lang]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
