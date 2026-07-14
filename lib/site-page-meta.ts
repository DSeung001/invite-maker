import type { Metadata } from "next";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/invite-i18n";
import type { InviteLanguage } from "@/lib/invite-types";
import { SITE_CHROME, SITE_PAGES } from "@/lib/site-pages-i18n";
import { OG_IMAGE, SITE_URL } from "@/lib/site-meta";
import type { SitePageSlug } from "@/lib/paths";
import { sitePagePath } from "@/lib/paths";

export function langStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export function parseLangParam(lang: string): InviteLanguage | null {
  return isSupportedLanguage(lang) ? lang : null;
}

export function buildPageMetadata(
  lang: InviteLanguage,
  slug: SitePageSlug,
): Metadata {
  const page = SITE_PAGES[slug][lang];
  const chrome = SITE_CHROME[lang];
  const path = sitePagePath(lang, slug);
  const url = `${SITE_URL}${path}`;

  const languages: Record<string, string> = Object.fromEntries(
    SUPPORTED_LANGUAGES.map((l) => [l, sitePagePath(l, slug)]),
  );
  languages["x-default"] = sitePagePath("ko", slug);

  return {
    title: {
      absolute: `${page.title} · ${chrome.siteName}`,
    },
    description: page.description,
    alternates: {
      canonical: path,
      languages,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: chrome.siteName,
      locale:
        lang === "ko"
          ? "ko_KR"
          : lang === "ja"
            ? "ja_JP"
            : lang === "zh"
              ? "zh_CN"
              : "en_US",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [OG_IMAGE.url],
    },
  };
}
